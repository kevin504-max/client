export default {
    dashboard: {
        title: 'Tablero',
        schedule: 'Citas',
        statistics: {
            this_week: 'Esta Semana',
            last_week: 'Semana Pasada',
            this_month: 'Este Mes',
            last_month: 'Mes Pasado',
        },
        
        meetings: 'Donaciones',
        meetings_count: 'Donaciones programadas',
        meetings_proportion: '{total} de {avg} donaciones',
        meetings_description: 'Tu resultado actual comparado con sistemas del mismo sector es: Por encima de la meta',
        
        last_contacts: 'Últimas Donaciones',
    },
    settings: {
        title: 'Configuraciones de la Cuenta',
        meetings_proportion: '{total} de {avg} donaciones programadas',
        company_info: {
            title: 'Información de la Empresa',
            name: 'Nombre: ',
            phone: 'Teléfono: ',
            cnpj: 'CNPJ: ',
        },
        reset_password: 'Restablecer Contraseña',
        save_changes: 'Guardar Cambios',
        
        modal_title: 'Para actualizar tu información, necesitamos validar tus credenciales',
        modal_email: 'Correo Electrónico Actual',
        modal_password: 'Contraseña',
        modal_confirm: 'Confirmar',
        modal_cancel: 'Cancelar',
    },

    admin: {
        users: {
            title: 'Usuarios',
            search: 'Buscar',
            add: 'Nuevo Usuario',
            fields: {
                name: 'Nombre',
                city: 'Ciudad',
                street: 'Calle',
                number: 'Número',
                complement: 'Complemento',
                rg: 'RG',
                type: 'Tipo',
                actions: 'Acciones',
            },
            modals: {
                register: {
                    title: 'Registrar Usuario',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',
                    default_password: '*Contraseña predeterminada establecida como',

                    success: 'Usuario registrado con éxito',
                    error: '¡Error al registrar el usuario! Inténtalo de nuevo.',
                },
                update: {
                    title: 'Actualizar Usuario',
                    confirm: 'Actualizar',
                    cancel: 'Cancelar',

                    success: 'Usuario actualizado con éxito',
                    error: '¡Error al actualizar el usuario! Inténtalo de nuevo.',
                },
                remove: {
                    title: 'Eliminar Usuario',
                    confirm: 'Eliminar',
                    cancel: 'Cancelar',
                    content: '¿Realmente deseas eliminar al usuario {name}? Esta acción no podrá deshacerse.',

                    success: 'Usuario eliminado con éxito',
                    error: '¡Error al eliminar el usuario! Inténtalo de nuevo.',
                }
            },
            empty: 'No se encontraron usuarios',
            showing: 'Mostrando {count} de {total} usuarios',
        },
        types: {
            title: 'Tipos',
            search: 'Buscar',
            add: 'Nuevo Tipo',
            fields: {
                type: 'Tipo',
                factor: 'Factor',
                actions: 'Acciones',
            },
            modals: {
                register: {
                    title: 'Registrar Tipo',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Tipo registrado con éxito',
                    error: '¡Error al registrar el tipo! Inténtalo de nuevo.',
                },
                update: {
                    title: 'Actualizar Tipo',
                    confirm: 'Actualizar',
                    cancel: 'Cancelar',

                    success: 'Tipo actualizado con éxito',
                    error: '¡Error al actualizar el tipo! Inténtalo de nuevo.',
                },
                remove: {
                    title: 'Eliminar Tipo',
                    confirm: 'Eliminar',
                    cancel: 'Cancelar',
                    content: '¿Realmente deseas eliminar el tipo {name}? Esta acción no podrá deshacerse.',

                    success: 'Tipo eliminado con éxito',
                    error: '¡Error al eliminar el tipo! Inténtalo de nuevo.',
                }
            },
            empty: 'No se encontraron tipos de sangre',
            showing: 'Mostrando {count} de {total} tipos',
        },
        states: {
            title: 'Estados',
            search: 'Buscar',
            add: 'Nuevo Estado',
            fields: {
                name: 'Nombre',
                initials: 'Siglas',
                actions: 'Acciones',
            },
            modals: {
                register: {
                    title: 'Registrar Estado',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Estado registrado con éxito',
                    error: '¡Error al registrar el estado! Inténtalo de nuevo.',
                },
                update: {
                    title: 'Actualizar Estado',
                    confirm: 'Actualizar',
                    cancel: 'Cancelar',

                    success: 'Estado actualizado con éxito',
                    error: '¡Error al actualizar el estado! Inténtalo de nuevo.',
                },
                remove: {
                    title: 'Eliminar Estado',
                    confirm: 'Eliminar',
                    cancel: 'Cancelar',
                    content: '¿Realmente deseas eliminar el estado {name}? Esta acción no podrá deshacerse.',

                    success: 'Estado eliminado con éxito',
                    error: '¡Error al eliminar el estado! Inténtalo de nuevo.',
                }
            },
            empty: 'No se encontraron estados',
            showing: 'Mostrando {count} de {total} estados',
        },
        cities: {
            title: 'Ciudades',
            search: 'Buscar',
            add: 'Nueva Ciudad',
            fields: {
                name: 'Nombre',
                state: 'Estado',
                actions: 'Acciones',
            },
            modals: {
                register: {
                    title: 'Registrar Ciudad',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Ciudad registrada con éxito',
                    error: '¡Error al registrar la ciudad! Inténtalo de nuevo.',
                },
                update: {
                    title: 'Actualizar Ciudad',
                    confirm: 'Actualizar',
                    cancel: 'Cancelar',

                    success: 'Ciudad actualizada con éxito',
                    error: '¡Error al actualizar la ciudad! Inténtalo de nuevo.',
                },
                remove: {
                    title: 'Eliminar Ciudad',
                    confirm: 'Eliminar',
                    cancel: 'Cancelar',
                    content: '¿Realmente deseas eliminar la ciudad {name}? Esta acción no podrá deshacerse.',

                    success: 'Ciudad eliminada con éxito',
                    error: '¡Error al eliminar la ciudad! Inténtalo de nuevo.',
                }
            },
            empty: 'No se encontraron ciudades',
            showing: 'Mostrando {count} de {total} ciudades',
        },
        blood_donations: {
            title: 'Donaciones de Sangre',
            search: 'Buscar',
            add: 'Nueva Donación',
            fields: {
                user: 'Usuario',
                type: 'Tipo',
                date: 'Fecha',
                actions: 'Acciones',
            },
            modals: {
                register: {
                    title: 'Registrar Donación',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Donación registrada con éxito',
                    error: '¡Error al registrar la donación! Inténtalo de nuevo.',
                },
                update: {
                    title: 'Actualizar Donación',
                    confirm: 'Actualizar',
                    cancel: 'Cancelar',

                    success: 'Donación actualizada con éxito',
                    error: '¡Error al actualizar la donación! Inténtalo de nuevo.',
                },
                remove: {
                    title: 'Eliminar Donación',
                    confirm: 'Eliminar',
                    cancel: 'Cancelar',
                    content: '¿Realmente deseas eliminar la donación de {name}? Esta acción no podrá deshacerse.',

                    success: 'Donación eliminada con éxito',
                    error: '¡Error al eliminar la donación! Inténtalo de nuevo.',
                }
            },
            empty: 'No se encontraron donaciones',
            showing: 'Mostrando {count} de {total} donaciones',
        },
    }
};