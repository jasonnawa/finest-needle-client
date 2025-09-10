'use client'

import { useState, useEffect } from "react";
import { getAllCourses, sendCourseToEmail } from "@/api/courses/courseService";
import { CourseDTO } from "@/api/courses/courseTypes";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState<CourseDTO[]>([])
  const [email, setEmail] = useState<string>("")
  const [selectedCourse, setSelectedCourse] = useState<CourseDTO | null>(null)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getAllCourses();
        if (res.status) {
          setCourses(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSend = async () => {
    if (!selectedCourse || !email) {
      toast.error("Please provide an email");
      return;
    }

    try {
      setIsSending(true);

      const response = await sendCourseToEmail(selectedCourse._id, email);

      if (!response.status) {
        toast.error(response.message || "Failed to send course");
        return;
      }

      toast.success(response.message || "Course sent successfully");
      setEmail(""); // reset input
      setSelectedCourse(null); // close modal
    } catch (error) {
      console.error("❌ Error sending course:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <SiteHeader title="Courses" />
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses && courses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">
                    Learn the fundamentals of {course.title.toLowerCase()}.
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-pink-600 font-bold text-lg">€{course.price}</p>
                  <Button
                    className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm"
                    onClick={() => setSelectedCourse(course)}
                  >
                    Send Course
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {courses.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
              <svg
                className="w-12 h-12 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14.25v.008h.008V14.25H12zm0 0a4.5 4.5 0 01-4.5-4.5 4.5 4.5 0 119 0 4.5 4.5 0 01-4.5 4.5zm0 0v3.75"
                ></path>
              </svg>
              <p className="text-lg font-semibold">No courses available</p>
              <p className="text-sm">Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Send {selectedCourse?.title}
            </DialogTitle>
          </DialogHeader>

          <Input
            type="email"
            placeholder="Enter recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <DialogFooter>
            <Button onClick={handleCourseSend} disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
