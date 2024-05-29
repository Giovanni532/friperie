"use client"

import React, { useState } from 'react'
import { CircleUserRound } from 'lucide-react'
import { updateData } from '@/app/db/request/updateDoc';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/app/db/config';
import Image from 'next/image';
import { revalidateUser } from '@/app/admin/[id]/dashboard/action/action';
import { Button } from '@/components/ui/button';

const ImageProfile = ({ user }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadImage = async () => {
        if (file) {
            const storageRef = ref(storage, `user/${user.uid}/`);
            await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(storageRef);
            await updateData(user.uid, "user", { image: downloadUrl });
            await revalidateUser(user.uid);
            setFile(null);
        }
    }

    return (
        <div className="space-y-1">
            <label className="cursor-pointer mt-2">
                <input aria-label="Ajout image photo de profile"
                    onChange={handleFileChange}
                    className="hidden"
                    type="file"
                />
                {user.image ?
                    <Image
                        alt="user profile"
                        className="rounded-full"
                        height={100}
                        src={user.image}
                        style={{
                            aspectRatio: "100/100",
                            objectFit: "cover",
                        }}
                        width={100}
                    />
                    :
                    <CircleUserRound style={{ height: '100px', width: '100px' }} />
                }
            </label>
            {file && <Button onClick={uploadImage}>Ajoutez l'image</Button>}
        </div>
    )
}

export default ImageProfile;