import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Layers, 
  Key, 
  FileCheck2, 
  Activity, 
  Users, 
  Database,
  Server,
  Fingerprint
} from 'lucide-react';

export default function EnterpriseFeatures() {
  const securityFeatures = [
    {
      icon: Layers,
      title: 'Control Plane vs Data Plane Separation',
      desc: 'Borrowing from Kubernetes, Guild runs purely as the control plane. Your actual payloads, proprietary databases, and sensitive data never transit our infrastructure.'
    },
    {
      icon: Key,
      title: 'Zero-Trust Credential Masking',
      desc: 'Agents never see raw API tokens or DB passwords. Guild issues ephemeral, cryptographic single-use session tokens mapped to least-privilege IAM roles.'
    },
    {
      icon: FileCheck2,
      title: 'Immutable SOC2 Type II Audit Trails',
      desc: 'Every prompt, model reasoning step, policy check, and tool invocation is hashed into an immutable append-only ledger for complete regulatory compliance.'
    },
    {
      icon: Fingerprint,
      title: 'Enterprise Identity & RBAC (SAML/Okta)',
      desc: 'Integrate directly with Okta, Azure Active Directory, and Google Workspace. Enforce which team can deploy which class of autonomous agent.'
    },
    {
      icon: ShieldCheck,
      title: 'PII Redaction & Data Loss Prevention',
      desc: 'Automated regex and entity extraction strips social security numbers, credit cards, and customer PII before sending prompts to third-party LLMs.'
    },
    {
      icon: Activity,
      title: 'Granular Cost Attribution & Chargebacks',
      desc: 'Track exact dollar and token spend broken down by engineering squads, business departments, and customer tenant IDs in real-time.'
    }
  ];

  return (
    <section className="py-24 bg-[#07080d] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono font-semibold tracking-wide mb-3">
            <Lock className="w-3.5 h-3.5 text-violet-400" />
            <span>ENTERPRISE GRADE ASSURANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Security That Satisfies Your CISO
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Empower developers to ship autonomous AI without keeping the security team awake at night.
          </p>
        </div>

        {/* 6-box feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#0c0f18] border border-white/[0.08] hover:border-violet-500/40 transition-all duration-300 hover:scale-[1.01] shadow-xl group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
