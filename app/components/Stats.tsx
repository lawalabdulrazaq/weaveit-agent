import {
  Video,
  Star,
  Users,
  Clock
} from "lucide-react";

export default function Stats() {
  return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Videos Created", icon: Video },
              { number: "5M+", label: "Minutes Saved", icon: Clock },
              { number: "98%", label: "User Satisfaction", icon: Star },
              { number: "50+", label: "Languages Supported", icon: Users },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-weaveit-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-weaveit-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}