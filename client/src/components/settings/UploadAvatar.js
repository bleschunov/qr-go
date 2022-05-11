import useAuth from "hooks/useAuth"
import useImagesService from "hooks/useImagesService"
import { createRef, useState } from "react"
import classNames from "classnames"

import Card from "components/card/Card"
import Icon from "components/Icon"
import Button from "components/Button"
import Container from "components/Container"
import SmallTitle from "components/SmallTitle"

import Avatar from "components/Avatar"



const UploadAvatar = ({ className }) => {
    const { uploadImage } = useImagesService()
    const { auth, setAuth } = useAuth()
    const [inputState, setInputState] = useState('idle') // idle, dragOver, dropped
    const [file, setFile] = useState(null)
    const fileInputRef = createRef()

    const handleSubmit = async event => {
        event.preventDefault()

        try {
            const data = await uploadImage(file)
            setAuth(prev => {
                return { ...prev, user: { ...prev.user, thumbnail: data.newImageName } }
            })
            fileInputRef.current.value = null
            setInputState('idle')
            setFile(null)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDragStart = event => {
        event.preventDefault()
        setInputState('dragOver')
    }

    const handleDragLeave = event => {
        event.preventDefault()
        setInputState('idle')
    }

    const handleDrop = event => {
        event.preventDefault()
        setInputState('dropped')
        console.log(event.dataTransfer.files[0])
        setFile(event.dataTransfer.files[0])
    }

    const handleAttachFile = event => {
        setInputState('dropped')
        console.log(event.target.files[0])
        setFile(event.target.files[0])
    }

    return (
        <section className={classNames(className)}>
            <Container>
                <SmallTitle className="mb-5" title="Фотография" />
                <Avatar className="mb-6" src={auth.user.ava} width="64" height="64" />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input 
                        className="hidden" 
                        name="avatar" 
                        type="file"
                        id="avatar"
                        onChange={handleAttachFile}
                        ref={fileInputRef}
                    />
                    <label htmlFor="avatar">
                        <Card 
                            className={`group cursor-pointer ${classNames({ 'ring-4': inputState === 'dragOver', 'hover:ring-4': inputState !== 'dropped' })} ring-primary-100 transition-shadow mb-8`}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragStart}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="relative w-12 h-12 mx-auto mb-3 flex">
                                <div className={`absolute rounded-full bg-gray-50 w-full h-full ${classNames({ 'animate-ping': inputState === 'dragOver', 'group-hover:animate-ping': inputState !== 'dropped' })}`}></div>
                                <div className="absolute rounded-full bg-gray-50 w-full h-full"></div>
                                <div className="absolute rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-gray-100 w-9 h-9"></div>
                                <Icon 
                                    className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-gray-600" 
                                    name={inputState === 'dropped' ? 'image' : 'upload'} 
                                    width="20" 
                                    height="20" 
                                />
                            </div>
                            {
                                inputState === 'idle'
                                    ? (
                                        <>
                                            <div className="text-sm text-gray-500 text-center">
                                                <span className="text-primary-700">Нажми</span> или перетащи
                                            </div>
                                            <div className="text-xs text-gray-500 text-center">
                                                SVG, PNG, JPG или GIF
                                            </div>
                                        </>
                                    )
                                    : inputState === 'dragOver'
                                        ? (
                                            <div className="text-sm text-gray-500 text-center">
                                                Отпусти, чтоби прикрепить файл
                                            </div>
                                        )
                                        : (
                                            <div className="text-sm text-gray-500 text-center">
                                                {file.name}
                                            </div>
                                        )
                            }
                            
                        </Card>
                    </label>
                    <Button className="w-full" disabled={inputState !== 'dropped'}>Поменять аватарку</Button>
                </form>
            </Container>
        </section>
    )
}

export default UploadAvatar