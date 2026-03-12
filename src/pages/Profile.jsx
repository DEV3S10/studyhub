import { useState } from 'react'
import UserProfile from '../components/user/UserProfile'
import EditProfileForm from '../components/user/EditProfileForm'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'

const Profile = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px',
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                        Profile
                    </h1>
                    <p style={{ color: '#6b7280', marginTop: '2px', fontSize: '14px' }}>
                        Manage your personal information
                    </p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    ✏️ Edit Profile
                </Button>
            </div>

            {/* Profile card */}
            <div style={{ maxWidth: '500px' }}>
                <UserProfile />
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Edit Profile"
            >
                <EditProfileForm onClose={() => setShowModal(false)} />
            </Modal>
        </div>
    )
}

export default Profile