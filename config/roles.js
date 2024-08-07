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
            'delete_resource',
            'create_supportGroup',
            'read_supportGroup',
            'update_supportGroup',
            'delete_supportGroup',
            'join_supportGroup',
            'leave_supportGroup'
        ]
    },
    {
        role: 'professional',
        permissions: [
            'create_resource',
            'read_resource',
            'update_resource',
            'delete_resource',
            'create_supportGroup',
            'read_supportGroup',
            'update_supportGroup',
            'delete_supportGroup',
            'join_supportGroup',
            'leave_supportGroup'
        ]
    },
    {
        role: 'user',
        permissions: [
            'update_profile',
            'delete_profile',
            'read_resource',
            'read_supportGroup',
            'join_supportGroup',
            'leave_supportGroup'
        ]
    }

]