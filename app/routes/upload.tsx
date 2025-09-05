import Navbar from '~/components/navbar'
import { useState, type FormEvent } from 'react'
import FileUploader from '~/components/file-uploader'
import { usePuterStore } from '~/lib/puter'
import { convertPdfToImage } from '~/lib/pdf2img'
import { generateUUID } from '~/lib/utils'
import { prepareInstructions } from '../../constants'

const Upload = () => {
    const [isProccessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const { auth, fs, isLoading, ai, kv } = usePuterStore()



    const handleAnalyze = async (
        companyName: string,
        jobTitle: string,
        jobDescription: string,
        file: File) => {
        setIsProcessing(true)
        setStatusText('Uploading the file...')

        const uploadedFile = await fs.upload([file])

        if (!uploadedFile) return setStatusText('Error: failed to upload file')

        setStatusText('Converting to image...')

        const imageFile = await convertPdfToImage(file)

        if(!imageFile.file) {
            console.log(imageFile)
            return setStatusText("Error: Failed to convert to image")
        } 

        setStatusText('Uploading the image...')

        const uploadedImage = await fs.upload([imageFile.file])

        if(!uploadedImage) return setStatusText("Error: Failed to upload image")

        
        const uuid = generateUUID()

        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, 
            jobTitle,
            jobDescription,
            feedback : ''
        }


        await kv.set(`resume:${uuid}`, JSON.stringify(data))

        setStatusText('Analyzing...')


        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({jobTitle,jobDescription})
        )
        
        if(!feedback) return setStatusText("Error: Failed to analyze resume")


        const feedbackText = typeof feedback?.message.content === 'string'
            ? feedback?.message.content 
            : feedback?.message.content[0].text;

        data.feedback = JSON.parse(feedbackText)

        await kv.set(`resume:${uuid}`, JSON.stringify(data))

        setStatusText('Analysis complete, redirecting...')
        
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget.closest('form')

        if (form) {
            const formData = new FormData(form)

            const companyName = formData.get("company-name") as string
            const jobTitle = formData.get("job-title") as string
            const jobDescription = formData.get("job-description") as string

            if (!file) return

            handleAnalyze(companyName, jobTitle, jobDescription, file)
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