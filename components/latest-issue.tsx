import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LatestIssue() {
  return (
    <section className="bg-gray-50 rounded-xl p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Latest Issue</h2>
          <p className="text-gray-600">Volume 42, Issue 3 - July 2023</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-blue-700 hover:bg-blue-800 text-white">Subscribe to Journal</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Special Focus: Artificial Intelligence in Healthcare</CardTitle>
            <CardDescription>
              This issue explores the transformative potential of AI technologies in medical diagnosis, treatment
              planning, and healthcare management.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="border-b border-gray-100 pb-3">
                <Link href="/article/101" className="text-blue-700 hover:text-blue-800 font-medium">
                  AI-Driven Diagnostic Tools for Early Cancer Detection
                </Link>
                <p className="text-sm text-gray-600 mt-1">By Dr. Robert Chen, Stanford Medical School</p>
              </li>
              <li className="border-b border-gray-100 pb-3">
                <Link href="/article/102" className="text-blue-700 hover:text-blue-800 font-medium">
                  Machine Learning Approaches to Drug Discovery and Development
                </Link>
                <p className="text-sm text-gray-600 mt-1">By Dr. Lisa Wong, MIT</p>
              </li>
              <li>
                <Link href="/article/103" className="text-blue-700 hover:text-blue-800 font-medium">
                  Ethical Considerations in AI-Assisted Clinical Decision Making
                </Link>
                <p className="text-sm text-gray-600 mt-1">By Prof. James Miller, Oxford University</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Editor's Picks</CardTitle>
            <CardDescription>
              Selected articles from our editorial team highlighting groundbreaking research across disciplines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="border-b border-gray-100 pb-3">
                <Link href="/article/104" className="text-blue-700 hover:text-blue-800 font-medium">
                  Quantum Computing: Breaking the Encryption Barrier
                </Link>
                <p className="text-sm text-gray-600 mt-1">By Dr. Alan Turing, Cambridge University</p>
              </li>
              <li className="border-b border-gray-100 pb-3">
                <Link href="/article/105" className="text-blue-700 hover:text-blue-800 font-medium">
                  Neuroplasticity and Learning: New Insights from Longitudinal Studies
                </Link>
                <p className="text-sm text-gray-600 mt-1">By Dr. Maria Gonzalez, Harvard University</p>
              </li>
              <li>
                <Link href="/article/106" className="text-blue-700 hover:text-blue-800 font-medium">
                  Sustainable Materials for Next-Generation Solar Cells
                </Link>
                <p className="text-sm text-gray-600 mt-1">By Prof. David Kim, UC Berkeley</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
