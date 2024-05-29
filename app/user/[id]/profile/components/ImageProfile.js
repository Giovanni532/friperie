"use client"

import React  from 'react'
import { CircleUserRound } from 'lucide-react'
import { updateData } from '@/app/db/request/updateDoc';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/app/db/config';
import Image from 'next/image';
import { revalidateUser } from '@/app/admin/[id]/dashboard/action/action';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/app/providers/AuthProvider';

const ImageProfile = ({ user }) => {
    const { userLogged } = useAuthContext();

    const handleFileChange = async (e) => {
        await uploadImage(e.target.files[0]);
    };

    const uploadImage = async (file) => {
        if (file) {
            const storageRef = ref(storage, `user/${user.uid}/`);
            await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(storageRef);
            const userData = { ...user, image: downloadUrl }
            await updateData(user.uid, "user", { image: downloadUrl });
            userLogged(userData)
            await revalidateUser(user.uid);
        }
    }

    return (
        <div className="space-y-1">
            <label className="cursor-pointer my-2 flex flex-col items-center">
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
        </div>
    )
}

export default ImageProfile;