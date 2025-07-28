'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar"
import { getAllCourses } from "@/api/courses/courseService";
import { CourseDTO } from "@/api/courses/courseTypes";
const bannerImages = ["/banner3.jpg", "/banner5.jpg", "/middle_aged_love.jpg"];

export default function Courses() {
    const [bgIndex, setBgIndex] = useState(0);
    const [courses, setCourses] = useState<CourseDTO[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % bannerImages.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

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


    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full h-1/2 flex items-center justify-start px-6 pt-52 pb-40 overflow-hidden">
                <img
                    src={bannerImages[bgIndex]}
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                <div className="relative z-10">
                    <div className="bg-white/20 p-6 rounded-xl shadow-md max-w-2xl text-left ml-4 sm:ml-20">
                        <h1 className="text-4xl font-bold mb-4 text-white">
                            All Courses
                        </h1>
                        <p className="text-lg mb-6 text-white">
                            FinestNeedle connects hearts across the world. Whether it's
                            friendship or forever, start your journey here.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Available Courses</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {courses && courses.map((course) => (
                            <div key={course._id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                    <p className="text-gray-600 mb-4">Learn the fundamentals of {course.title.toLowerCase()}.</p>
                                </div>
                                <div className="mt-auto flex items-center justify-between">
                                    <p className="text-pink-600 font-bold text-lg">€{course.price}</p>
                                    <Link
                                        href={`/courses/${course._id}`}
                                        className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm"
                                    >
                                        View Course
                                    </Link>
                                </div>
                            </div>
                        ))}

                    </div>

                    {courses.length === 0 && (
                        <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
                            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v.008h.008V14.25H12zm0 0a4.5 4.5 0 01-4.5-4.5 4.5 4.5 0 119 0 4.5 4.5 0 01-4.5 4.5zm0 0v3.75"></path>
                            </svg>
                            <p className="text-lg font-semibold">No courses available</p>
                            <p className="text-sm">Please check back later.</p>
                        </div>
                    )}
                </div>
            </section>


        </div>
    )
}