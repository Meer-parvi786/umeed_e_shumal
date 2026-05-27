'use client';

import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
export default function BlogCard() {
     const router = useRouter();
  return (
    <section className="w-full py-16 px-4 bg-gray-50 dark:bg-black">
        <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-black hover:gap-3 transition-all"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-72 w-full">
            <img
              src="/images/Gallery/visit 2.jpeg"
              alt="Eidi Distribution at Five Star Boarding House Skardu"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="p-6 text-white">
                <p className="text-sm uppercase tracking-widest text-gray-200">
                  Community Visit
                </p>

                <h1 className="text-3xl md:text-4xl font-bold mt-2">
                  Eidi Distribution at Five Star Boarding House, Skardu
                </h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <p className="text-gray-600 dark:text-gray-300 leading-8 text-lg">
              Our team recently visited Five Star Boarding House, Skardu,
              to spread the joy of Eid among the students. During the visit,
              we distributed Eidi and spent memorable moments with the children,
              sharing smiles, laughter, and positivity.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-8 text-lg mt-5">
              The happiness on their faces reminded us how meaningful small
              gestures of kindness can be. We are thankful for the warm welcome
              and hope to continue such initiatives to support and encourage
              young minds in our community.
            </p>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="font-semibold text-black dark:text-white">
                  Umeed e Shumal
                </p>

                <p className="text-sm text-gray-500">
                  Spreading Hope & Happiness
                </p>
              </div>

              <button className="px-5 py-3 rounded-xl bg-black text-white hover:bg-zinc-800 transition">
                Read More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}