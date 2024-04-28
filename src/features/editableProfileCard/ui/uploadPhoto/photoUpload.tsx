import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/redesigned/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from '@/app/providers/StoreProvider';
import { uploadPhoto } from '../../model/services/uploadPhoto/UploadPhoto';

type PhotoUploadProps = {
    onChangeAvatar:((event:React.ChangeEvent<HTMLInputElement>)=>void) | undefined
}

export  function PhotoUpload(props:PhotoUploadProps) {
    const dispatch = useAppDispatch()
    const file = useSelector((state:StateSchema) => state?.profile?.file)
const {onChangeAvatar} = props

    const onFileUpload = async () => {
        const formData = new FormData();
        if (file){
            formData.append("file", file);
            dispatch(uploadPhoto({file}))
        }
    };

    return (
        <div>
            <h2>Завантаження зображення</h2>
            <input type="file" onChange={onChangeAvatar} />
            <Button onClick={onFileUpload}>
                Завантажити!
            </Button>
        </div>
    );
}

