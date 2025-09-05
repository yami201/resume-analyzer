import Navbar from '~/components/navbar'
import { useState, type FormEvent } from 'react'
import FileUploader from '~/components/file-uploader'

const Upload = () => {
    const [isProccessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget.closest('form')

        if (form) {
            const formData = new FormData(form)

            const companyName = formData.get("company-name")
            const jobTitle = formData.get("job-title")
            const jobDescription = formData.get("job-description")

            


        }
    }

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className='page-heading py-10'>
                    <h1>Smart feedback for your resume!</h1>
                    {
                        isProccessing ? (
                            <>
                                <h2>{statusText}</h2>
                                <img src='/images/resume-scan.gif' alt='Resume Scan' className='w-full' />
                            </>
                        ) : (
                            <h2>Drop your resume for an ATS score and improvement tips</h2>
                        )
                    }

                    {
                        !isProccessing && (
                            <form
                                className='flex flex-col gap-4 mt-10'
                                id='upload-form'
                                onSubmit={handleSubmit}>
                                <div className='form-div'>
                                    <label htmlFor='company-name'>Company name</label>
                                    <input
                                        type='text'
                                        id='company-name'
                                        name='company-name'
                                        placeholder='Company Name'
                                    />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor='job-title'>Job title</label>
                                    <input
                                        type='text'
                                        id='job-title'
                                        name='job-title'
                                        placeholder='Job Title'
                                    />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor='job-description'>Job description</label>
                                    <textarea
                                        rows={5}
                                        id='job-description'
                                        name='job-description'
                                        placeholder='Job description'
                                    />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor='uploader'>Uploader</label>
                                    <FileUploader 
                                        file={file}
                                        onFileSelect={handleFileSelect} />
                                </div>
                                <button className='primary-button' type='submit'>
                                    Analyze Resume
                                </button>
                            </form>
                        )
                    }
                </div>
            </section>

        </main>
    )
}

export default Upload