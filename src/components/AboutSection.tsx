import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Moon, Sun, Landmark } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Moon,
      title: "Full Moon Celebration",
      description: "Vesak is celebrated on the full moon of the month of May, commemorating Buddha's birth, enlightenment, and death."
    },
    {
      icon: Landmark,
      title: "Temple Visits",
      description: "Devotees visit Buddhist temples to offer prayers, flowers, candles and incense sticks to make offerings to Buddha."
    },
    {
      icon: Sun,
      title: "Light Offerings",
      description: "Lighting oil lamps and decorative lanterns symbolize Buddha's enlightenment and the dispelling of darkness."
    },
    {
      icon: CalendarDays,
      title: "Global Recognition",
      description: "In 1999, the United Nations officially recognized Vesak Day as an international day of observance."
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-purple-50 to-slate-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-primary mb-4">About Vesak Festival</h2>
          <p className="max-w-2xl mx-auto text-slate-600">
            Learn about the significance and traditions of one of Buddhism's most important celebrations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-medium text-slate-800 mb-4">Significance of Vesak</h3>
            <p className="text-slate-600 mb-6">
              Vesak, also known as Buddha Purnima, is one of the most significant festivals in Buddhism. It commemorates three important events in Buddha's life: his birth, enlightenment (Nirvana), and passing away (Parinirvana), which are believed to have occurred on the same day in different years.
            </p>
            <p className="text-slate-600">
              During Vesak, Buddhists around the world decorate their homes and temples with colorful lanterns and lotus flowers. They attend temple services, offer prayers, meditate, and engage in acts of kindness and charity. The lighting of lamps symbolizes the light of Buddha's teachings dispelling the darkness of ignorance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative overflow-hidden rounded-xl shadow-lg"
          >
            <div className="aspect-w-16 aspect-h-9 h-full">
              <img 
                src="https://www.wanderlustmagazine.com/wp-content/uploads/2023/10/vesak-day-main-burma-scaled.jpg" 
                alt="Vesak celebration with lanterns" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
