export const roles = [
    {
        role: 'admin',
        permissions: [
            'update_profile',
            'delete_profile',
            'create_user',
            'read_users',
            'update_user',
            'delete_user',
            'create_resource',
            'read_resource',
            'update_resource',
            'delete_resource'
        ]
    },
    {
        role: 'professional',
        permissions: [
            'create_resource',
            'read_resource',
            'update_resource',
            'delete_resource'
        ]
    },
    {
        role: 'user',
        permissions: [
            'update_profile',
            'delete_profile',
            'read_resource'
        ]
    }

]