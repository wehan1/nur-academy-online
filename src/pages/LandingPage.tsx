import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Book, Users, Award, Video } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import HeroImage from "@/components/HeroImage";
const LandingPage = () => {
  return <MainLayout>
      <div className="container px-4 md:px-6 mx-auto">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Welcome to <span className="text-madrasah-purple">Virtual Madrasah</span>
            </h1>
            <p className="text-xl text-gray-600 md:text-2xl max-w-[700px]">
              An interactive online platform for kids to learn Quran and Islamic Studies from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="bg-madrasah-purple hover:bg-madrasah-purple-dark">
                <Link to="/signup">Get Started <ChevronRight className="h-4 w-4 ml-2" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/login">Login to Your Account</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            <HeroImage />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24 bg-madrasah-purple-light rounded-3xl px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features for Everyone</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md card-hover">
              <Book className="h-12 w-12 text-madrasah-purple mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Courses</h3>
              <p className="text-gray-600">Engaging lessons designed for different learning styles and age groups.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md card-hover">
              <Users className="h-12 w-12 text-madrasah-blue mb-4" />
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">Tailored dashboards for students, parents, and teachers.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md card-hover">
              <Award className="h-12 w-12 text-madrasah-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Structured Curriculum</h3>
              <p className="text-gray-600">Four progressive levels to track and celebrate learning achievements.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md card-hover">
              <Video className="h-12 w-12 text-madrasah-pink mb-4" />
              <h3 className="text-xl font-semibold mb-2">Virtual Classrooms</h3>
              <p className="text-gray-600">Connect with teachers and classmates for live learning sessions.</p>
            </div>
          </div>
        </section>

        {/* Levels Overview */}
        <section className="py-12 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Curriculum</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Level 1 */}
            <div className="border border-madrasah-green-light bg-madrasah-green-light rounded-xl p-6 card-hover">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-madrasah-green text-white font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Beginner Level</h3>
              <p className="text-gray-600">Basic Quran reading, Islamic etiquettes, and introduction to prayer.</p>
            </div>
            
            {/* Level 2 */}
            <div className="border border-madrasah-blue-light bg-madrasah-blue-light rounded-xl p-6 card-hover">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-madrasah-blue text-white font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Foundation Level</h3>
              <p className="text-gray-600">Tajweed rules, short surahs memorization, and Islamic history.</p>
            </div>
            
            {/* Level 3 */}
            <div className="border border-madrasah-purple-light bg-madrasah-purple-light rounded-xl p-6 card-hover">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-madrasah-purple text-white font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Intermediate Level</h3>
              <p className="text-gray-600">Advanced Tajweed, longer surahs, Islamic principles and values.</p>
            </div>
            
            {/* Level 4 */}
            <div className="border border-madrasah-pink-light bg-madrasah-pink-light rounded-xl p-6 card-hover">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-madrasah-pink text-white font-bold mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Advanced Level</h3>
              <p className="text-gray-600">Quranic tafsir, Islamic jurisprudence, and character development.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 text-center bg-gradient-to-r from-madrasah-purple/90 to-madrasah-blue/90 text-white rounded-3xl">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl mb-8">Join thousands of students in their journey to learn Quran and Islamic Studies online.</p>
            <Button asChild size="lg" className="bg-white text-madrasah-purple hover:bg-gray-100">
              <Link to="/signup">Create Your Account Today</Link>
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-24">
          
          
        </section>
      </div>
    </MainLayout>;
};
export default LandingPage;