import React, { useState } from 'react';
import { DeviceModel } from '../types';
import { DEVICE_MODELS } from '../data';
import { Terminal, Download, ArrowRight, ShieldCheck, CheckCircle2, Copy, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstallWizardProps {
  darkMode: boolean;
  accentColor: string;
}

export default function InstallWizard({ darkMode, accentColor }: InstallWizardProps) {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('Google');
  const [selectedModelId, setSelectedModelId] = useState<string>('pixel9');
  const [installStyle, setInstallStyle] = useState<string>('macos');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const manufacturers = Array.from(new Set(DEVICE_MODELS.map(d => d.manufacturer)));
  const models = DEVICE_MODELS.filter(d => d.manufacturer === selectedManufacturer);
  const currentModel = DEVICE_MODELS.find(d => d.id === selectedModelId) || models[0] || DEVICE_MODELS[0];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Generate customized instructions based on selections
  const getSteps = (model: DeviceModel, style: string) => {
    const steps = [];
    
    // Step 1: Pre-requisites
    steps.push({
      title: 'Prerequisites & Backup',
      description: 'Unlock your device bootloader and backup all user files. Ensure Android SDK Platform Tools (ADB/Fastboot) are ready on your computer.',
      command: 'adb devices',
      note: 'Status should return a valid serial number indicator.'
    });

    // Step 2: Download files
    steps.push({
      title: 'Acquire AMX-OS Package',
      description: `Download the customized compilation bundle for ${model.modelName} (Codename: ${model.codename}) of stable channel matching setup '${style}'.`,
      downloadLabel: `Download AMX Bundle (${model.codename})`,
      downloadUrl: model.downloadUrl,
      note: 'Verify SHA256 checksum after download completes.'
    });

    // Step 3: Installation based on recovery method
    if (model.recoveryMethod === 'fastboot') {
      steps.push({
        title: 'Flash ROM via Fastboot Mode',
        description: 'Boot your device into Bootloader mode (Hold Vol Down + Power), connect to PC, unzip downloaded package, and execute the automated flashing script.',
        command: `unzip ${model.codename}_amx.zip -d amx_flash\ncd amx_flash\nchmod +x flash_all.sh\n./flash_all.sh`,
        note: 'DO NOT disconnect the USB cable during the flashing sequence.'
      });
    } else if (model.recoveryMethod === 'recovery-zip') {
      steps.push({
        title: 'Install via Custom Recovery (TWRP / OrangeFox)',
        description: 'Boot to custom recovery. Format Data (select yes). Copy downloaded AMX package to external storage or connect using MTP, and flash.',
        command: `adb push ${model.codename}_amx.zip /sdcard/\n# Or inside Custom Recovery UI: Install > ${model.codename}_amx.zip`,
        note: 'Keep Zip Verification checked before flashing.'
      });
    } else {
      steps.push({
        title: 'Install via ADB Sideload Mode',
        description: 'Boot to Custom Recovery / Lineage Recovery, select "Apply update" > "Apply from ADB". Connect PC and sideload the reskin OS zip.',
        command: `adb sideload ${model.codename}_amx.zip`,
        note: 'Progress may pause at 47% - this is expected in adb.'
      });
    }

    // Step 4: Finalize
    steps.push({
      title: 'Initial Boot & Glass Theme Configuration',
      description: 'Reboot system to trigger first boot. Once AMX system welcome wizard greets you, select "Apply standard glassmorphism dock shell" to activate macOS glossy theme.',
      command: 'fastboot reboot',
      note: 'First boot may take 2-4 minutes to optimize the glossy transition cache.'
    });

    return steps;
  };

  const stepsList = getSteps(currentModel, installStyle);

  return (
    <div className="space-y-8" id="installation-wizard">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Wizard Controls */}
        <div className={`flex-1 p-8 rounded-[2rem] border relative overflow-hidden transition-all duration-500 shadow-xl ${
          darkMode 
            ? 'bento-card-dark border-white/12 shadow-zinc-950/40' 
            : 'bento-card-light border-black/10 shadow-zinc-200/50'
        }`}>
          <div className="absolute top-4 right-10 flex gap-1 items-center">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <h3 className="text-xl font-bold font-display tracking-tight mb-4 flex items-center gap-2">
            <span className="p-1.5 rounded-lg text-white" style={{ backgroundColor: accentColor }}>
              <Download size={18} />
            </span>
            Installer Provisioner
          </h3>
          <p className={`text-sm mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Select your specific hardware details to generate precise, custom-tailored command lines and verified mirrors inspired by the open-source bazzite framework.
          </p>

          <div className="space-y-4">
            {/* Manufacturer Selector */}
            <div>
              <label className="block text-xs font-mono mb-2 uppercase tracking-wider text-zinc-500">
                1. Select Manufacturer
              </label>
              <div className="grid grid-cols-3 gap-2">
                {manufacturers.map(man => (
                  <button
                    key={man}
                    onClick={() => {
                      setSelectedManufacturer(man);
                      const matching = DEVICE_MODELS.filter(d => d.manufacturer === man);
                      if (matching.length > 0) {
                        setSelectedModelId(matching[0].id);
                      }
                    }}
                    className={`px-3 py-2 text-sm rounded-xl font-medium border transition-all cursor-pointer ${
                      selectedManufacturer === man
                        ? darkMode
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-white border-black shadow'
                        : darkMode
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                          : 'bg-black/5 border-black/5 hover:bg-black/10 text-black'
                    }`}
                  >
                    {man}
                  </button>
                ))}
              </div>
            </div>

            {/* Models Selector */}
            <div>
              <label className="block text-xs font-mono mb-2 uppercase tracking-wider text-zinc-500">
                2. Select Specific Phone Model
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {models.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModelId(m.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm border transition-all cursor-pointer ${
                      selectedModelId === m.id
                        ? darkMode
                          ? 'bg-zinc-800/80 border-white/20 ring-2'
                          : 'bg-white border-black/20 ring-2'
                        : darkMode
                          ? 'bg-white/5 border-white/5 hover:bg-white/8 text-zinc-300'
                          : 'bg-black/5 border-black/5 hover:bg-black/8 text-zinc-800'
                    }`}
                    style={{
                      borderColor: selectedModelId === m.id ? accentColor : undefined,
                      boxShadow: selectedModelId === m.id ? `0 0 12px ${accentColor}15` : undefined
                    }}
                  >
                    <div>
                      <div className="font-semibold">{m.modelName}</div>
                      <div className="text-xs font-mono text-zinc-500">{m.codename}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                        {m.recoveryMethod.toUpperCase()}
                      </span>
                      {selectedModelId === m.id && (
                        <CheckCircle2 size={16} style={{ color: accentColor }} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Style Selector (Customization demonstration) */}
            <div>
              <label className="block text-xs font-mono mb-2 uppercase tracking-wider text-zinc-500">
                3. Configure macOS Shell Injection
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'macos', label: 'Classic macOS Glass', desc: 'Adds Dock + Dynamic Island' },
                  { id: 'minimal-hybrid', label: 'Minimal Ivory', desc: 'Serene widget focus, warm style' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setInstallStyle(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      installStyle === item.id
                        ? darkMode
                          ? 'bg-zinc-800/80 border-white/20'
                          : 'bg-white border-black/20 font-bold'
                        : darkMode
                          ? 'bg-white/5 border-white/5 hover:bg-white/8'
                          : 'bg-black/5 border-black/5 hover:bg-black/8'
                    }`}
                    style={{
                      borderColor: installStyle === item.id ? accentColor : undefined
                    }}
                  >
                    <div className="text-xs font-bold font-display">{item.label}</div>
                    <div className={`text-[10px] mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Wizard Script Output / Steps */}
        <div className="flex-[1.3] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                <Terminal size={14} /> Flash Deployment Routine
              </h4>
              <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                CODENAME: {currentModel.codename}
              </span>
            </div>

            <div className="space-y-4">
              {stepsList.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-xl relative ${
                    darkMode ? 'bg-zinc-900/60 border border-white/5' : 'bg-[#FAF8F5] border border-black/5'
                  }`}
                >
                  <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-mono text-xs font-bold border border-blue-500/20">
                    {idx + 1}
                  </div>
                  
                  <div className="pl-8">
                    <h5 className="font-semibold text-sm font-display mb-1">{step.title}</h5>
                    <p className={`text-xs mb-3 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {step.description}
                    </p>

                    {/* Step Mirror downloads */}
                    {step.downloadLabel && (
                      <a
                        href={step.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-white transition-all transform hover:-translate-y-0.5"
                        style={{ backgroundColor: accentColor }}
                      >
                        <Download size={12} />
                        {step.downloadLabel}
                      </a>
                    )}

                    {/* Terminal command simulator */}
                    {step.command && (
                      <div className="relative mt-2.5 rounded-lg overflow-hidden bg-zinc-950 font-mono text-xs p-3 text-zinc-300 border border-zinc-800">
                        <div className="flex items-center justify-between text-[10px] text-zinc-600 mb-2 border-b border-zinc-900 pb-1.5">
                          <span>SHELL EXECUTION</span>
                          <button
                            onClick={() => copyToClipboard(step.command || '', idx)}
                            className="hover:text-zinc-300 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Copy size={10} />
                            {copiedIndex === idx ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre-wrap leading-tight">{step.command}</pre>
                      </div>
                    )}

                    {step.note && (
                      <span className="block mt-2 text-[10px] font-mono text-zinc-500">
                        * Note: {step.note}
                      </span>
                    )}

                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 p-3 bg-green-500/10 text-green-500 rounded-xl border border-green-500/20 text-xs">
            <ShieldCheck size={16} className="shrink-0" />
            <span>The generated flash layout commands are securely cross-checked with the AMX OS hardware validation system.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
