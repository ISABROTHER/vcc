import { useState } from 'react';
import {
  Shield,
  Heart,
  Banknote,
  Languages,
  Sun,
  Phone,
  Plane,
  Thermometer,
  Droplets,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  Globe,
  Shirt,
  Clock,
  Zap,
} from 'lucide-react';

interface InfoSection {
  id: string;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

const InfoCard = ({ icon: Icon, title, value, sub }: { icon: React.ElementType; title: string; value: string; sub?: string }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
    <div className="flex items-center gap-3 mb-1">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
        <Icon size={20} className="text-amber-700" />
      </div>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{title}</p>
        <p className="text-lg font-bold text-slate-900">{value}</p>
      </div>
    </div>
    {sub && <p className="text-xs text-slate-500 ml-[52px]">{sub}</p>}
  </div>
);

export default function TouristInfoPage() {
  const [openSection, setOpenSection] = useState<string | null>('safety');

  const sections: InfoSection[] = [
    {
      id: 'safety',
      icon: Shield,
      title: 'Safety & Security',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Cape Coast is generally safe for tourists. The local community is welcoming and accustomed to visitors. Standard travel precautions apply.</p>
          <ul className="space-y-2">
            <li className="flex gap-2"><ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" /> Avoid walking alone late at night in poorly lit areas, especially near the beach.</li>
            <li className="flex gap-2"><ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" /> Keep valuables secure. Use your hotel safe for passports and extra cash.</li>
            <li className="flex gap-2"><ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" /> Use registered taxis or arrange transport through your hotel.</li>
            <li className="flex gap-2"><ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" /> The ocean has strong currents — swim only at designated beaches and heed local advice.</li>
            <li className="flex gap-2"><ShieldCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" /> Drink bottled or filtered water. Avoid ice from unknown sources.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'health',
      icon: Heart,
      title: 'Health & Medical',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Ensure you have travel insurance that covers medical evacuation. Cape Coast has hospitals and pharmacies, but Accra offers more advanced facilities for serious issues.</p>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="font-bold text-amber-800 text-xs uppercase tracking-wider mb-2">Key facilities</p>
            <ul className="space-y-1 text-amber-900 text-sm">
              <li>Cape Coast Teaching Hospital — main public hospital</li>
              <li>University Hospital, UCC — on campus</li>
              <li>Multiple pharmacies along the main road and near markets</li>
            </ul>
          </div>
          <p><strong>Vaccinations:</strong> Yellow fever is required for entry. Recommended: Hepatitis A & B, Typhoid, Malaria prophylaxis.</p>
          <p><strong>Malaria:</strong> Use insect repellent, sleep under treated mosquito nets, and consider antimalarial medication.</p>
        </div>
      ),
    },
    {
      id: 'money',
      icon: Banknote,
      title: 'Money & Currency',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>The currency is the Ghana Cedi (GHS). Most transactions in Cape Coast are cash-based.</p>
          <ul className="space-y-2">
            <li><strong>ATMs:</strong> Available at GCB Bank, Ecobank, Fidelity Bank and others. See our <a href="/banks" className="text-amber-600 underline">Banks & ATMs page</a>.</li>
            <li><strong>Mobile Money:</strong> Widely accepted. MTN MoMo is most common. Buy a local SIM at any telecom shop.</li>
            <li><strong>Cards:</strong> Accepted at larger hotels and some restaurants. Always carry cash as backup.</li>
          </ul>
          <div className="bg-sky-50 rounded-xl p-4 border border-sky-100">
            <p className="font-bold text-sky-800 text-xs uppercase tracking-wider mb-1">Tipping</p>
            <p className="text-sky-900 text-sm">Appreciated but not mandatory. 5–10% at restaurants is generous. Tour guides and hotel staff appreciate small tips (GHS 5–20).</p>
          </div>
        </div>
      ),
    },
    {
      id: 'language',
      icon: Languages,
      title: 'Language & Useful Fante Phrases',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>English is the official language and widely spoken. The local language is Fante (a dialect of Akan).</p>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50"><tr><th className="text-left p-3 font-semibold text-slate-700">English</th><th className="text-left p-3 font-semibold text-slate-700">Fante</th></tr></thead>
              <tbody>
                {[
                  ['Hello / Welcome', 'Akwaaba'],
                  ['How are you?', 'Ɛte sɛn?'],
                  ['I\'m fine', 'Me ho yɛ'],
                  ['Thank you', 'Medaase'],
                  ['Please', 'Mepa wo kyɛw'],
                  ['How much?', 'Ɛyɛ sɛn?'],
                  ['Yes / No', 'Aane / Daabi'],
                  ['Goodbye', 'Nante yie'],
                ].map(([en, fa]) => (
                  <tr key={en} className="border-t border-slate-100"><td className="p-3">{en}</td><td className="p-3 font-medium text-amber-700">{fa}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">Learning a few Fante phrases will delight locals and open doors everywhere you go.</p>
        </div>
      ),
    },
    {
      id: 'weather',
      icon: Sun,
      title: 'Weather & Best Time to Visit',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Cape Coast has a tropical climate. The coast is warm year-round, 24–32°C (75–90°F).</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-center">
              <Sun size={24} className="mx-auto text-amber-500 mb-2" />
              <p className="font-bold text-slate-900">Dry season</p>
              <p className="text-xs text-slate-600">Nov – Mar</p>
              <p className="text-xs text-amber-700 font-medium mt-1">Best for tourism</p>
            </div>
            <div className="bg-sky-50 rounded-xl p-4 border border-sky-100 text-center">
              <Droplets size={24} className="mx-auto text-sky-500 mb-2" />
              <p className="font-bold text-slate-900">Rainy season</p>
              <p className="text-xs text-slate-600">Apr – Jul, Sep – Oct</p>
              <p className="text-xs text-sky-700 font-medium mt-1">Green & lush, fewer crowds</p>
            </div>
          </div>
          <p><strong>Peak season:</strong> Jul–Sep (festivals) and Dec–Jan (Christmas). Book well in advance.</p>
        </div>
      ),
    },
    {
      id: 'visa',
      icon: Plane,
      title: 'Visa & Entry Requirements',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Most visitors require a visa to enter Ghana. ECOWAS nationals are exempt.</p>
          <ul className="space-y-2">
            <li><strong>Visa on Arrival:</strong> Available for AU citizens at Kotoka International Airport.</li>
            <li><strong>E-Visa:</strong> Apply online at ghana.gov.gh before travelling.</li>
            <li><strong>Yellow Fever:</strong> Proof of vaccination is mandatory for entry.</li>
            <li><strong>Passport:</strong> Must be valid for at least 6 months beyond travel dates.</li>
          </ul>
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <p className="flex items-center gap-2 font-bold text-red-800 text-xs uppercase tracking-wider mb-1"><AlertTriangle size={14} /> Important</p>
            <p className="text-red-800 text-sm">Visa requirements change frequently. Always check the latest requirements before travelling.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'customs',
      icon: Globe,
      title: 'Local Customs & Etiquette',
      content: (
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <ul className="space-y-2">
            <li><strong>Greetings:</strong> Ghanaians value greetings. Always greet people before starting a conversation. Right-hand handshake is standard.</li>
            <li><strong>Right hand:</strong> Use your right hand for handshakes, passing items and eating.</li>
            <li><strong>Photography:</strong> Always ask permission before photographing people, especially at castles and fishing communities.</li>
            <li><strong>Dress:</strong> Cover shoulders and knees at churches and chiefs' palaces. Swimwear at the beach only.</li>
            <li><strong>Bargaining:</strong> Expected at markets and with taxis. Start at 50% and negotiate with a smile.</li>
            <li><strong>Chiefs:</strong> Show respect for traditional authority. Remove shoes and hat at chiefs' palaces.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'packing',
      icon: Shirt,
      title: 'What to Pack',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">Essentials</p>
            <ul className="space-y-1 text-slate-600">
              <li>• Light cotton clothing</li>
              <li>• Comfortable walking shoes</li>
              <li>• Sunscreen SPF 30+</li>
              <li>• Insect repellent (DEET)</li>
              <li>• Reusable water bottle</li>
              <li>• Power adapter (UK 3-pin, Type G)</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="font-bold text-slate-800 mb-2">Recommended</p>
            <ul className="space-y-1 text-slate-600">
              <li>• Rain jacket or umbrella</li>
              <li>• Torch/flashlight (power cuts)</li>
              <li>• Basic first aid kit</li>
              <li>• Hand sanitiser</li>
              <li>• Modest clothing for cultural visits</li>
              <li>• Waterproof phone case</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase mb-3">Essential Travel Info</p>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Everything you need to know</h1>
          <p className="text-slate-300 max-w-xl text-base sm:text-lg">Practical information to help you plan, prepare and enjoy your Cape Coast experience.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <InfoCard icon={Thermometer} title="Climate" value="24–32°C" sub="Warm & tropical year-round" />
          <InfoCard icon={Banknote} title="Currency" value="Ghana Cedi" sub="₵ (GHS) · Cash is king" />
          <InfoCard icon={Zap} title="Power" value="230V / 50Hz" sub="UK-style 3-pin (Type G)" />
          <InfoCard icon={Clock} title="Time zone" value="GMT+0" sub="No daylight saving" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
          <h2 className="flex items-center gap-2 font-bold text-red-900 mb-4"><Phone size={20} /> Emergency Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[['191','Ambulance'],['192','Fire Service'],['191','Police'],['112','General Emergency']].map(([num, label]) => (
              <div key={label} className="bg-white rounded-xl p-3 text-center border border-red-100">
                <p className="text-2xl font-bold text-red-700">{num}</p>
                <p className="text-xs text-red-600">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button onClick={() => setOpenSection(isOpen ? null : section.id)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0"><section.icon size={20} className="text-amber-700" /></div>
                    <span className="font-bold text-slate-900">{section.title}</span>
                  </div>
                  <ChevronDown size={20} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <div className="px-5 pb-5 pt-0 ml-[52px]">{section.content}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
