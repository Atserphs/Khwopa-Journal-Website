import Footer from "@/components/footer1"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About JournalHub</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Advancing knowledge through quality research publication and dissemination
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4 text-lg">
              JournalHub is dedicated to advancing human knowledge by publishing high-quality, peer-reviewed research
              across a wide range of academic disciplines. We believe in the power of open access to accelerate
              discovery and innovation.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              Our mission is to connect researchers, academics, and professionals with the latest findings and
              breakthroughs in their fields, fostering collaboration and the exchange of ideas that drive progress.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our History</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Founded in 2005, JournalHub began as a small collection of open-access journals in the sciences. Over the
              years, we have expanded our scope to include publications across the humanities, social sciences,
              medicine, engineering, and more.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              Today, we host over 200 peer-reviewed journals and have published more than 50,000 articles from
              researchers in over 150 countries, making us one of the leading platforms for academic publishing
              worldwide.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Editorial Standards</h2>
            <p className="text-gray-700 mb-4 text-lg">
              We maintain rigorous editorial standards to ensure the quality and integrity of all published research.
              Our peer-review process involves multiple rounds of evaluation by experts in the relevant field, ensuring
              that only methodologically sound and significant research reaches publication.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              All JournalHub publications adhere to international ethical guidelines for research and publication,
              including those set forth by the Committee on Publication Ethics (COPE).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Elizabeth Chen</h3>
                <p className="text-gray-600 mb-2">Editor-in-Chief</p>
                <p className="text-gray-700">
                  Dr. Chen has over 20 years of experience in academic publishing and holds a Ph.D. in Molecular Biology
                  from Stanford University.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Prof. James Wilson</h3>
                <p className="text-gray-600 mb-2">Managing Director</p>
                <p className="text-gray-700">
                  Prof. Wilson oversees the strategic direction of JournalHub and has previously served as dean at
                  several prestigious universities.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Maria Rodriguez</h3>
                <p className="text-gray-600 mb-2">Technical Director</p>
                <p className="text-gray-700">
                  Dr. Rodriguez leads our digital platform development, ensuring JournalHub remains at the cutting edge
                  of academic publishing technology.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Samuel Okonkwo</h3>
                <p className="text-gray-600 mb-2">Director of Outreach</p>
                <p className="text-gray-700">
                  Dr. Okonkwo works to expand JournalHub's global reach and ensure diversity and inclusion in academic
                  publishing.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
