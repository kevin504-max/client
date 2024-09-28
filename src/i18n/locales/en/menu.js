export default {
    dashboard: {
        title: 'Dashboard',
        schedule: 'Appointments',
        statistics: {
            this_week: 'This Week',
            last_week: 'Last Week',
            this_month: 'This Month',
            last_month: 'Last Month',
        },
        
        meetings: 'Meetings',
        meetings_count: 'Scheduled Meetings',
        meetings_proportion: '{total} of {avg} meetings',
        meetings_description: 'Your current results compared to companies in the same sector are: Above the target',
        
        last_contacts: 'Last Contacts',
    },
    settings: {
        title: 'Account Settings',
        meetings_proportion: '{total} of {avg} scheduled meetings',
        company_info: {
            title: 'Company Information',
            name: 'Name: ',
            phone: 'Phone: ',
            cnpj: 'CNPJ: ',
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
                city: 'City',
                street: 'Street',
                number: 'Number',
                complement: 'Complement',
                rg: 'RG',
                type: 'Type',
                actions: 'Actions',
            },
            modals: {
                register: {
                    title: 'Register User',
                    confirm: 'Register',
                    cancel: 'Cancel',
                    default_password: '*Default password set as',

                    success: 'User registered successfully',
                    error: 'Error registering user! Please try again.',
                },
                update: {
                    title: 'Update User',
                    confirm: 'Update',
                    cancel: 'Cancel',

                    success: 'User updated successfully',
                    error: 'Error updating user! Please try again.',
                },
                remove: {
                    title: 'Remove User',
                    confirm: 'Remove',
                    cancel: 'Cancel',
                    content: 'Do you really want to remove the user {name}? This action cannot be undone.',

                    success: 'User removed successfully',
                    error: 'Error removing user! Please try again.',
                }
            },
            empty: 'No users found',
            showing: 'Showing {count} of {total} users',
        },
        types: {
            title: 'Types',
            search: 'Search',
            add: 'New Type',
            fields: {
                type: 'Type',
                factor: 'Factor',
                actions: 'Actions',
            },
            modals: {
                register: {
                    title: 'Register Type',
                    confirm: 'Register',
                    cancel: 'Cancel',

                    success: 'Type registered successfully',
                    error: 'Error registering type! Please try again.',
                },
                update: {
                    title: 'Update Type',
                    confirm: 'Update',
                    cancel: 'Cancel',

                    success: 'Type updated successfully',
                    error: 'Error updating type! Please try again.',
                },
                remove: {
                    title: 'Remove Type',
                    confirm: 'Remove',
                    cancel: 'Cancel',
                    content: 'Do you really want to remove the type {name}? This action cannot be undone.',

                    success: 'Type removed successfully',
                    error: 'Error removing type! Please try again.',
                }
            },
            empty: 'No blood types found',
            showing: 'Showing {count} of {total} types',
        },
        states: {
            title: 'States',
            search: 'Search',
            add: 'New State',
            fields: {
                name: 'Name',
                initials: 'Abbreviation',
                actions: 'Actions',
            },
            modals: {
                register: {
                    title: 'Register State',
                    confirm: 'Register',
                    cancel: 'Cancel',

                    success: 'State registered successfully',
                    error: 'Error registering state! Please try again.',
                },
                update: {
                    title: 'Update State',
                    confirm: 'Update',
                    cancel: 'Cancel',

                    success: 'State updated successfully',
                    error: 'Error updating state! Please try again.',
                },
                remove: {
                    title: 'Remove State',
                    confirm: 'Remove',
                    cancel: 'Cancel',
                    content: 'Do you really want to remove the state {name}? This action cannot be undone.',

                    success: 'State removed successfully',
                    error: 'Error removing state! Please try again.',
                }
            },
            empty: 'No states found',
            showing: 'Showing {count} of {total} states',
        },
        cities: {
            title: 'Cities',
            search: 'Search',
            add: 'New City',
            fields: {
                name: 'Name',
                state: 'State',
                actions: 'Actions',
            },
            modals: {
                register: {
                    title: 'Register City',
                    confirm: 'Register',
                    cancel: 'Cancel',

                    success: 'City registered successfully',
                    error: 'Error registering city! Please try again.',
                },
                update: {
                    title: 'Update City',
                    confirm: 'Update',
                    cancel: 'Cancel',

                    success: 'City updated successfully',
                    error: 'Error updating city! Please try again.',
                },
                remove: {
                    title: 'Remove City',
                    confirm: 'Remove',
                    cancel: 'Cancel',
                    content: 'Do you really want to remove the city {name}? This action cannot be undone.',

                    success: 'City removed successfully',
                    error: 'Error removing city! Please try again.',
                }
            },
            empty: 'No cities found',
            showing: 'Showing {count} of {total} cities',
        }
    }
};
