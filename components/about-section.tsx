import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20 bg-[#111111]">
      <div className="container mx-auto px-4 sm:px-8 max-w-[1300px]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-white">
            About Me
          </h2>
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
  {/* Mengubah pembungkus gambar menjadi flex vertikal */}
  <div className="relative flex flex-col items-center md:items-end gap-4">
    <Image
      src="/magang.jpeg"
      alt="Developer workspace 1"
      width={450}
      height={300}
      className="w-full max-w-[350px] md:max-w-[350px] rounded-lg shadow-2xl shadow-black/40 object-cover"
    />
    <Image
      src="/yudisium.jpeg"
      alt="Developer workspace 2"
      width={450}
      height={300}
      className="w-full max-w-[350px] md:max-w-[350px] rounded-lg shadow-2xl shadow-black/40 object-cover"
    />
  </div>
            <div>
              <p className="text-base sm:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed">
                Hello! I am Muhammad Amar Fizaruddin, an Informatics Engineering graduate from Universitas Darul 'Ulum Jombang 
                with a strong background and interest in multimedia and information technology. 
                I am experienced in graphic design, photo and video editing, photography, and videography, alongside foundational skills 
                in program and system analysis.
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-4 md:mb-6 leading-relaxed">
                My professional background includes hands-on multimedia production—such as public service announcements 
                and short films during my internship at SMK Queen Al Falah. I have served as a Graphic Design Mentor at the Vocational Training Center (BLK), 
                guiding trainees in using CorelDRAW to create snack packaging designs. Additionally, I completed an internship at the Jombang Regency Agriculture Office, 
                supporting administrative operations, data processing, and program planning. I am a detail-oriented, creative, and communicative professional who thrives both independently and in team settings.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs sm:text-sm font-semibold transition-colors bg-[#1a1a1a] text-gray-200 border border-white/20 hover:bg-white/10 hover:border-white/40">
                  5+ Years Experience
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs sm:text-sm font-semibold transition-colors bg-[#1a1a1a] text-gray-200 border border-white/20 hover:bg-white/10 hover:border-white/40">
                  Fresh Graduate
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs sm:text-sm font-semibold transition-colors bg-[#1a1a1a] text-gray-200 border border-white/20 hover:bg-white/10 hover:border-white/40">
                  Informatics Engineering
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs sm:text-sm font-semibold transition-colors bg-[#1a1a1a] text-gray-200 border border-white/20 hover:bg-white/10 hover:border-white/40">
                  Multimedia
                </span>   
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
