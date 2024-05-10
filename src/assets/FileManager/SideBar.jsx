
import styled from 'styled-components';
import { Modal } from '@mui/material';
import { useState } from 'react';
import {  db } from "../../firebaseconfig";
import { serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';


const SidebarContainer = styled.div`
    margin-top: 10px;
`
const SidebarBtn = styled.div`
    button {
        background: transparent;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        border-radius: 40px;
        padding:5px 10px;
        box-shadow:2px 2px 2px #ccc;
        margin-left: 20px;
        span {
            font-size: 16px;
            margin-right: 20px;
            margin-left: 10px;
        }
    }
`

const SidebarOptions = styled.div`
    
    
`


const ModalPopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
`

const ModalHeading = styled.div`
    text-align: center;
    border-bottom: 1px solid lightgray;
    height: 40px;
`

const ModalBody = styled.div`
    input.modal__submit {
        width: 100%;
        background: darkmagenta;
        padding: 10px 20px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 16px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
        margin-top:20px
    }
    input.modal__file {
        background: whitesmoke;
        padding: 20px;
        color: #000;
        display: block;
        margin-top:20px
    }
`

const UploadingPara = styled.p`
    background: green;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`
const Sidebar = () => {
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [open, setOpen] = useState(false);

    const handleFile = e => {
        if(e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        setUploading(true);
    
        // Get a reference to the Firebase Storage bucket
        const storage = getStorage();
    
        // Create a reference to the file in Firebase Storage
        const storageRef = ref(storage, `files/${file.name}`);
    
        try {
            // Upload the file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);
    
            // Get the file size from the File object
            const fileSize = file.size;
    
            // Add file details to Firestore
            await addDoc(collection(db, 'myfiles'), {
                timestamp: serverTimestamp(),
                filename: file.name,
                fileURL: `files/${file.name}`,
                size: fileSize // Use the file size obtained from the File object
            });
    
            // File upload and Firestore update completed successfully
            setUploading(false);
            setFile(null);
            setOpen(false);
        } catch (error) {
            // Handle errors
            console.error('Error uploading file:', error);
            setUploading(false);
        }
    };
    
    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalPopup>
                    <form onSubmit={handleUpload}>
                        <ModalHeading>
                            <h3>Select file you want to upload</h3>
                        </ModalHeading>
                        <ModalBody>
                            {uploading ? <UploadingPara>Uploading...</UploadingPara> : (
                                <>
                                    <input type="file" className='modal__file' onChange={handleFile} />
                                    <input type="submit" className='modal__submit' />
                                </>
                            )}
                        </ModalBody>
                    </form>
                </ModalPopup>
            </Modal>
            <SidebarContainer>
                <SidebarBtn>
                    <button onClick={() => setOpen(true)}>
                        <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" alt="upload" />
                        <span>New</span>
                    </button>
                </SidebarBtn>
                <hr />
            </SidebarContainer>
        </>
    )
}
export default Sidebar;