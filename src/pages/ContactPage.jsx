import React from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

const ContactPage = () => {
return ( <section className="py-16 px-4 animate-in fade-in duration-500"> <div className="max-w-6xl mx-auto">

```
    {/* Header */}

    <div className="text-center mb-16">
      <h2 className="text-4xl font-black mb-4 tracking-tight">
        We're Here to Help
      </h2>
      <p className="text-slate-500">
        Building trust through 24/7 support and local understanding.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* Contact Details */}

      <div className="space-y-8">

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h3 className="text-xl font-bold mb-6">
            Contact Details
          </h3>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm border border-slate-100">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Email Us
                </p>

                <p className="font-bold text-slate-800">
                  help.posterbabu@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-sm border border-slate-100">
                <MessageCircle size={20} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  WhatsApp
                </p>

                <p className="font-bold text-slate-800">
                  +91 7428091729
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Business Hours */}

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">

          <h3 className="text-xl font-bold mb-6">
            Business Hours
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Monday – Saturday
              </span>

              <span className="font-bold">
                10 AM – 8 PM
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Sunday
              </span>

              <span className="font-bold text-orange-600">
                Special Requests Only
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* Contact Form */}

      <div className="bg-white border p-8 md:p-10 rounded-[2.5rem] shadow-lg">

        <h3 className="text-xl font-bold mb-8">
          Quick Query
        </h3>

        <form
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400">
              Full Name
            </label>

            <input
              className="w-full bg-slate-50 border p-4 rounded-xl outline-none focus:border-orange-500 transition-colors font-medium"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400">
              Email / Phone
            </label>

            <input
              className="w-full bg-slate-50 border p-4 rounded-xl outline-none focus:border-orange-500 transition-colors font-medium"
              placeholder="How to reach you?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400">
              Message
            </label>

            <textarea
              rows="4"
              className="w-full bg-slate-50 border p-4 rounded-xl outline-none focus:border-orange-500 transition-colors font-medium"
              placeholder="Write your message..."
            />
          </div>

          <button
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Send Message
          </button>

        </form>

      </div>

    </div>

  </div>
</section>
);
};

export default ContactPage;
