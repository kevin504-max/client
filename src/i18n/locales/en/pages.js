export default {
    dashboard: {
        title: 'Dashboard',
        schedule: 'Schedule',
        statistics: {
            this_week: 'This Week',
            last_week: 'Last Week',
            this_month: 'This Month',
            last_month: 'Last Month',
        },
        
        meetings: 'Donations',
        meetings_count: 'Scheduled Donations',
        meetings_proportion: '{total} of {avg} donations',
        meetings_description: 'Your result so far compared to systems in the same segment is: Above the goal',
        
        last_contacts: 'Last Contacts',
    },
    contacts: {
        title: 'Contacts',
        search: 'Search',
        export: 'Export',
        select_all: 'Select All',
        empty: 'No contacts found',
        showing: 'Showing {count} of {total} contacts',
    },
    integrations: {
        title: 'Integrations',
        description: 'Here you can integrate your database with the main CRM management platforms.',
        add: 'New Integration',
        connect: 'Configure',
    },
    settings: {
        title: 'Account Settings',
        meetings_proportion: '{total} of {avg} donations scheduled',
        company_info: {
            title: 'Company Information',
            name: 'Name: ',
            phone: 'Phone: ',
            cnpj: 'CNPJ: : ',
        },
        reset_password: 'Reset Password', 
        save_changes: 'Save Changes',
        
        modal_title: 'To update your information, we need to validate your credentials',
        modal_email: 'Current Email',
        modal_password: 'Password',
        modal_confirm: 'Confirm',
        modal_cancel: 'Cancel',        
    },
    
    admin: {
        users: {
            title: 'Users',
            search: 'Search',
            add: 'New User',
            fields: {
                name: 'Name',
                email: 'Email',
                business: 'Business',
                status: 'Status',
                actions: 'Actions',
            },
            modals: {
                register: {
                    title: 'Register User',
                    confirm: 'Register',
                    cancel: 'Cancel',
                    default_password: '*Default password set as',

                    success: 'User registered successfully',
                    error: 'Error registering user! Try again.',
                },
                update: {
                    title: 'Update User',
                    confirm: 'Update',
                    cancel: 'Cancel',

                    success: 'User updated successfully',
                    error: 'Error updating user! Try again.',
                },
                remove: {
                    title: 'Remove User',
                    confirm: 'Remove',
                    cancel: 'Cancel',
                    content: 'Are you sure you want to remove the user {name}? This action cannot be undone.',

                    success: 'User removed successfully',
                    error: 'Error removing user! Try again.',
                }
            },
            empty: 'No users found',
            showing: 'Showing {count} of {total} users',
        },          
        companies: {
            title: 'Companies',
            search: 'Search',
            add: 'New Company',
            fields: {
                name: 'Name',
                business: 'Business',
                created_at: 'Creation Date',
                plan: 'Plan',
                cnpj: 'CNPJ',
                phone: 'Phone',
                actions: 'Actions',
            },
            modals: {
                register: {
                    title: 'Register Company',
                    confirm: 'Register',
                    cancel: 'Cancel',

                    success: 'Company registered successfully',
                    error: 'Error registering company! Try again.',
                },
                update: {
                    title: 'Update Company',
                    confirm: 'Update',
                    cancel: 'Cancel',

                    success: 'Company updated successfully',
                    error: 'Error updating company! Try again.',
                },
                remove: {
                    title: 'Remove Company',
                    confirm: 'Remove',
                    cancel: 'Cancel',
                    content: 'Are you sure you want to remove the company {name}? This action cannot be undone.',

                    success: 'Company removed successfully',
                    error: 'Error removing company! Try again.',
                }
            },
            empty: 'No companies found',
            showing: 'Showing {count} of {total} companies',
        },          
    }
};