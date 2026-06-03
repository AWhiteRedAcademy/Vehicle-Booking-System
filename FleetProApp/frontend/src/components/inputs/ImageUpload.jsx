import React, { useState } from 'react';
import { supabase } from '../../HTTPS Services/supabaseClient.js';

function VehicleImageUpload({ vehicleId, onUploadSuccess }) {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = async (event) => {
        try {
            setUploading(true);
            setMessage('');

            const selectedFile = event.target.files[0];
            if (!selectedFile) return;

            const maxSizeBytes = 5 * 1024 * 1024;
            if (selectedFile.size > maxSizeBytes) {
                throw new Error('Image size is too large. Please upload an image under 5MB.');
            }

            if (!selectedFile.type.startsWith('image/')) {
                throw new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
            }

            const filePath = `cars/${vehicleId}.jpg`;

            // Convert file object to a binary stream
            const fileBuffer = new Blob([selectedFile], { type: selectedFile.type });

            // Send binary stream to storage bucket
            const { data, error: uploadError } = await supabase.storage
                .from('Vehicle Images')
                .upload(filePath, fileBuffer, {
                    upsert: true,
                    contentType: 'image/jpeg'
                });

            if (uploadError) throw uploadError;

            setMessage('Image uploaded successfully!');

            if (onUploadSuccess) {
                onUploadSuccess();
            }

        } catch (error) {
            console.error('Upload operation failed:', error);
            setMessage(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };


  return (
    <div style={{ margin: '15px 0' }}>
      <label 
        htmlFor={`vehicle-upload-${vehicleId}`}
        style={{
          padding: '8px 16px',
          backgroundColor: uploading ? '#ccc' : '#1976d2',
          color: '#fff',
          borderRadius: '4px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          display: 'inline-block',
          fontWeight: '500'
        }}
      >
        {uploading ? 'Uploading Photo...' : 'Choose Vehicle Image'}
      </label>
      
      <input
        type="file"
        id={`vehicle-upload-${vehicleId}`}
        accept="image/jpeg, image/jpg, image/png"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ display: 'none' }} // Hidden to use custom stylized label above
      />

      {message && (
        <p style={{ 
          fontSize: '14px', 
          marginTop: '8px', 
          color: message.includes('failed') ? '#d32f2f' : '#2e7d32' 
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default VehicleImageUpload;
