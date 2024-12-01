"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GradientText from "@/components/gradient-text";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/Footer/Footer";

const TemplatesPage = ({ templates }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="font-normal">
      <Navbar />
      <div className="bg-[#ECF4FB] w-full min-h-screen pb-8">
        {/* Header */}
        <div className="w-full flex flex-col items-center justify-center pt-8">
          <div className="p-3 md:p-5 lg:p-0 w-full text-center">
            <GradientText
              text="Flutter App Templates"
              className="text-[30px] lg:text-[40px] font-medium text-center"
            />
            <p className="text-heading font-medium text-sm lg:text-[16px]">
              Ready-to-use Flutter templates to <GradientText text="kickstart" /> your next mobile app
            </p>
          </div>

          {/* Search and Filters */}
          <div className="w-full max-w-6xl mt-8 px-3 md:px-5 lg:px-0">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search templates..."
                  className="pl-10 py-6 bg-white"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <select
                className="p-2 rounded-lg border border-input bg-white min-w-[200px]"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="ecommerce">E-commerce</option>
                <option value="social-media">Social Media</option>
                <option value="education">Education</option>
                <option value="health-fitness">Health & Fitness</option>
              </select>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates?.map((template) => (
                <Link href={`/templates/${template.slug}`} key={template._id}>
                  <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={template.screenshots[0]}
                        alt={template.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2 text-heading">{template.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#62A5DA]">${template.price}</span>
                        <div className="flex gap-2">
                          {template.techStack.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-[#ECF4FB] rounded-full text-sm text-heading">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TemplatesPage; 