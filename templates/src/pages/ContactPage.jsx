import React from 'react';

function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 relative">
            Contact Us
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent rounded-full"></div>
          </h1>
          <p className="text-text text-lg opacity-90">Get in touch with us</p>
        </div>

        {/* Contact Form and Info */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-text mb-6">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-accent mr-3"></i>
                  <div>
                    <p className="text-text font-semibold">Email</p>
                    <p className="text-text opacity-90">contact@bookrecommender.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-accent mr-3"></i>
                  <div>
                    <p className="text-text font-semibold">Phone</p>
                    <p className="text-text opacity-90">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-accent mr-3"></i>
                  <div>
                    <p className="text-text font-semibold">Address</p>
                    <p className="text-text opacity-90">123 Book Street, Reading City, RC 12345</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock text-accent mr-3"></i>
                  <div>
                    <p className="text-text font-semibold">Business Hours</p>
                    <p className="text-text opacity-90">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-text mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-text font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-text placeholder-text placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-text font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-text placeholder-text placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-text font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-text placeholder-text placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Message Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-text font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-text placeholder-text placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;