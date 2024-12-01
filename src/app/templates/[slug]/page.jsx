"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import GradientText from "@/components/gradient-text";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/Footer/Footer";

const TemplateDetail = ({ template }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <main className="font-normal">
      <Navbar />
      <div className="bg-[#ECF4FB] w-full min-h-screen">
        <div className="max-w-6xl mx-auto px-3 md:px-5 lg:px-0 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Image Gallery */}
            <div>
              <div className="relative h-[600px] rounded-xl overflow-hidden mb-4 bg-white p-4">
                <Image
                  src={template.screenshots[activeImage]}
                  alt={template.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {template.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden bg-white p-2 ${
                      activeImage === index ? 'ring-2 ring-[#62A5DA]' : ''
                    }`}
                  >
                    <Image
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-heading">{template.title}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-[#62A5DA]">${template.price}</span>
                  <Button variant="gradient" size="lg" className="px-8">
                    Purchase Template
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-heading">Description</h2>
                <p className="text-gray-600">{template.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-heading">Features</h2>
                <ul className="space-y-4">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#62A5DA]/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#62A5DA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-heading">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {template.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white rounded-full text-sm font-medium text-heading"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {template.demoUrl && (
                <div>
                  <a
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#62A5DA] hover:underline flex items-center gap-2"
                  >
                    View Live Demo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TemplateDetail; 