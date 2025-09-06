import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import ATS from "~/components/ats"
import Details from "~/components/details"
import Summary from "~/components/summary"
import { usePuterStore } from "~/lib/puter"

export const meta = () => ([
    { title: 'ResumeIQ | Review' },
    { name: 'description', connect: 'Detailed overview of your resume' }
])

const Resume = () => {
    const { id } = useParams()
    const { kv, auth, isLoading, fs } = usePuterStore()
    const [imageUrl, setImageUrl] = useState('')
    const [resumeUrl, setResumeUrl] = useState('')
    const [feedback, setFeedback] = useState<Feedback | null>(null)
    const [data, setData] = useState<Resume | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const navigate = useNavigate()


    const handleDelete = async () => {
        if (!id || !data) return
        if(!data?.resumePath || !data?.imagePath) return
        setIsDeleting(true)

        await kv.delete(`resume:${id}`)
        await fs.delete(data.resumePath)
        await fs.delete(data.imagePath)

        navigate('/')

    }


    useEffect(
        () => {
            if (!isLoading && !auth.isAuthenticated) {
                navigate(`/auth?next=/resume/${id}`)
            }
        }, [isLoading]
    )

    useEffect(
        () => {
            const loadResume = async () => {
                const resume = await kv.get(`resume:${id}`)

                if (!resume) return

                const data = JSON.parse(resume)

                setData(data)

                const resumeBlob = await fs.read(data.resumePath)


                if (!resumeBlob) return

                const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' })

                const resumeUrl = URL.createObjectURL(pdfBlob)

                setResumeUrl(resumeUrl)



                const imageBlob = await fs.read(data.imagePath)

                if (!imageBlob) return

                const imageUrl = URL.createObjectURL(imageBlob)

                setImageUrl(imageUrl)

                setFeedback(data.feedback)

                console.log({ imageUrl, feedback, resumeUrl })

            }

            loadResume()
        }, [id]
    )



    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to='/' className='back-button'>
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>

                <button 
                    disabled={isDeleting}
                    className="back-button disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDelete}>
                    <img src="/icons/trash.svg"/>
                    <span className="text-gray-800 text-sm font-semibold">Delete</span>
                </button>
            </nav>

            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {
                        imageUrl && resumeUrl && (
                            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
                                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src={imageUrl}
                                        className="w-full h-full object-contain rounded-2xl"
                                        alt='Resume'
                                    />
                                </a>
                            </div>
                        )
                    }

                </section>

                <section className="feedback-section">
                    <h2 className='text-4xl !text-gradient font-bold'>Resume Review</h2>
                    {
                        feedback ? (
                            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                                <Summary feedback={feedback} />
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []}/>
                                <Details  feedback={feedback} />
                            </div>
                        ) : (
                            <img src="/images/resume-scan-2.gif" className="w-full" />
                        )
                    }
                </section>

            </div>
        </main>
    )
}

export default Resume