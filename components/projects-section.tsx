"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Github, ExternalLink, Play, X } from "lucide-react"
import type { Project } from "@/types"

interface ProjectsSectionProps {
  projects: Project[]
}

function usePerPage() {
  const [perPage, setPerPage] = useState(3)
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const update = () => setPerPage(query.matches ? 3 : 1)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return perPage
}

function isVideoSource(src: string) {
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(src)
}

function ProjectSlider({ images, title }: { images: string[]; title: string }) {
  const perPage = usePerPage()
  const total = images.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const [index, setIndex] = useState(0)
  const dragStart = useRef<number | null>(null)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [previewSource, setPreviewSource] = useState<string | null>(null)

  const prev = () => setIndex((i) => (i - 1 + pages) % pages)
  const next = () => setIndex((i) => (i + 1) % pages)

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return
    setDragX(e.clientX - dragStart.current)
  }

  const endDrag = () => {
    if (dragStart.current === null) return
    if (dragX < -50) next()
    else if (dragX > 50) prev()
    dragStart.current = null
    setDragging(false)
    setDragX(0)
  }

  useEffect(() => {
    if (!previewSource) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewSource(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [previewSource])

  return (
    <div className="relative group">
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          className={`flex -mx-1.5 ${dragging ? "transition-none" : "transition-transform duration-300"}`}
          style={{ transform: `translateX(calc(-${index * 100}% + ${dragX}px))` }}
        >
          {images.map((src, i) => {
            const isVideo = isVideoSource(src)

            return (
              <div key={i} className={`shrink-0 px-1.5 ${perPage === 3 ? "w-1/3" : "w-full"}`}>
                <button
                  type="button"
                  onClick={() => setPreviewSource(src)}
                  aria-label={`Open ${title} ${isVideo ? "video" : "image"} ${i + 1}`}
                  className="relative aspect-video w-full overflow-hidden rounded-[8px] border border-white/10 bg-black/30 block"
                >
                  {isVideo ? (
                    <video
                      src={src}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={`${title} - ${i + 1}`}
                      fill
                      draggable={false}
                      sizes="(min-width: 668px) 25vw, 60vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  {isVideo && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/50 text-white shadow-lg">
                        <Play className="h-5 w-5 fill-current" />
                      </span>
                    </span>
                  )}

                  <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
      {pages > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous images"
            className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-white transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next images"
            className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-white transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      {pages > 1 && (
        <div className="flex gap-1.5 mt-4 justify-center">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      )}

      {previewSource && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={isVideoSource(previewSource) ? "Project video preview" : "Project image preview"}
          onClick={() => setPreviewSource(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl">
            <button
              type="button"
              aria-label="Close preview"
              onClick={() => setPreviewSource(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white transition hover:bg-white hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-[80vh] w-full overflow-hidden rounded-[12px] border border-white/20 bg-black">
              {isVideoSource(previewSource) ? (
                <video
                  src={previewSource}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <Image
                  src={previewSource}
                  alt={`${title} preview`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-12 md:py-20 bg-[#111111]">
      <div className="container mx-auto px-4 sm:px-8 max-w-[1400px]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12 text-white">
          Featured Projects
        </h2>
        <div className="flex flex-col gap-10 md:gap-16 max-w-7xl mx-auto">
          {projects.map((project) => (
            <article key={project.title}>
              <div className="flex items-center justify-between gap-2 mb-4 md:mb-6">
                <div className="flex items-center gap-2 min-w-0">
                  {/* <div className="w-5 h-5 sm:w-6 sm:h-6 overflow-hidden shrink-0">
                    <Image src={project.logo || project.images[0]} alt={project.title} width={24} height={24} className="w-full h-full object-cover" />
                  </div> */}
                  <h3 className="text-lg sm:text-2xl font-semibold text-white min-w-0">{project.title}</h3>
                </div>
                {/* <div className="flex gap-2 sm:gap-3 shrink-0">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md px-2.5 sm:px-3 h-8 w-8 sm:w-auto text-xs sm:text-sm font-medium text-gray-200 border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  )}
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md px-2.5 sm:px-3 h-8 w-8 sm:w-auto text-xs sm:text-sm font-medium text-gray-200 border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Live Demo</span>
                    </a>
                  )}
                </div> */}
              </div>
              <ProjectSlider images={project.images} title={project.title} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
