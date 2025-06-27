import { useUploadAvatarMutation } from '../api/profileApi';

export const useAvatarUpload = () => {
    const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

    const handleAvatarUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadAvatar(formData).unwrap();
            return response;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw error;
        }
    };

    return {
        uploadAvatar: handleAvatarUpload,
        isLoading
    };
}; 