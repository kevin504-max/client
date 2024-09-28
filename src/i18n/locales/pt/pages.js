export default {
    dashboard: {
        title: 'Dashboard',
        schedule: 'Agendamentos',
        statistics: {
            this_week: 'Essa Semana',
            last_week: 'Semana Passada',
            this_month: 'Esse Mês',
            last_month: 'Mês Passado',
        },
        
        meetings: 'Doações',
        meetings_count: 'doações agendadas',
        meetings_proportion: '{total} de {avg} doações',
        meetings_description: 'O seu resultado até o momento comparado a sistemas do mesmo segmento está: Acima da meta',
        
        last_contacts: 'Últimos Contatos',
    },
    settings: {
        title: 'Configurações da Conta',
        meetings_proportion: '{total} de {avg} doações agendadas',
        company_info: {
            title: 'Informações da Empresa',
            name: 'Nome: ',
            phone: 'Telefone: ',
            cnpj: 'CNPJ: : ',
        },
        reset_password: 'Redefinir Senha',
        save_changes: 'Salvar Alterações',
        
        modal_title: 'Para atualizar suas informações, precisamos validar suas credenciais',
        modal_email: 'E-mail Atual',
        modal_password: 'Senha',
        modal_confirm: 'Confirmar',
        modal_cancel: 'Cancelar',
    },

    admin: {
        users: {
            title: 'Usuários',
            search: 'Pesquisar',
            add: 'Novo Usuário',
            fields: {
                name: 'Nome',
                city: 'Cidade',
                street: 'Rua',
                number: 'Número',
                complement: 'Complemento',
                rg: 'RG',
                type: 'Tipo',
                actions: 'Ações',
            },
            modals: {
                register: {
                    title: 'Registrar Usuário',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',
                    default_password: '*Senha padrão definia como',

                    success: 'Usuário registrado com sucesso',
                    error: 'Erro ao registrar usuário! Tente novamente.',
                },
                update: {
                    title: 'Atualizar Usuário',
                    confirm: 'Atualizar',
                    cancel: 'Cancelar',

                    success: 'Usuário atualizado com sucesso',
                    error: 'Erro ao atualizar usuário! Tente novamente.',
                },
                remove: {
                    title: 'Remover Usuário',
                    confirm: 'Remover',
                    cancel: 'Cancelar',
                    content: 'Deseja realmente remover o usuário {name}? Esta ação não poderá ser desfeita.',

                    success: 'Usuário removido com sucesso',
                    error: 'Erro ao remover usuário! Tente novamente.',
                }
            },
            empty: 'Nenhum usuário encontrado',
            showing: 'Mostrando {count} de {total} usuários',
        },
        types: {
            title: 'Tipos',
            search: 'Pesquisar',
            add: 'Novo Tipo',
            fields: {
                type: 'Tipo',
                factor: 'Fator',
                actions: 'Ações',
            },
            modals: {
                register: {
                    title: 'Registrar Tipo',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Tipo registrado com sucesso',
                    error: 'Erro ao registrar tipo! Tente novamente.',
                },
                update: {
                    title: 'Atualizar Tipo',
                    confirm: 'Atualizar',
                    cancel: 'Cancelar',

                    success: 'Tipo atualizado com sucesso',
                    error: 'Erro ao atualizar tipo! Tente novamente.',
                },
                remove: {
                    title: 'Remover Tipo',
                    confirm: 'Remover',
                    cancel: 'Cancelar',
                    content: 'Deseja realmente remover o tipo {name}? Esta ação não poderá ser desfeita.',

                    success: 'Tipo removido com sucesso',
                    error: 'Erro ao remover tipo! Tente novamente.',
                }
            },
            empty: 'Nenhum tipo sanguíneo encontrado',
            showing: 'Mostrando {count} de {total} tipos',
        },
        states: {
            title: 'Estados',
            search: 'Pesquisar',
            add: 'Novo Estado',
            fields: {
                name: 'Nome',
                initials: 'Sigla',
                actions: 'Ações',
            },
            modals: {
                register: {
                    title: 'Registrar Estado',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Estado registrado com sucesso',
                    error: 'Erro ao registrar estado! Tente novamente.',
                },
                update: {
                    title: 'Atualizar Estado',
                    confirm: 'Atualizar',
                    cancel: 'Cancelar',

                    success: 'Estado atualizado com sucesso',
                    error: 'Erro ao atualizar estado! Tente novamente.',
                },
                remove: {
                    title: 'Remover Estado',
                    confirm: 'Remover',
                    cancel: 'Cancelar',
                    content: 'Deseja realmente remover o estado {name}? Esta ação não poderá ser desfeita.',

                    success: 'Estado removido com sucesso',
                    error: 'Erro ao remover estado! Tente novamente.',
                }
            },
            empty: 'Nenhum estado encontrado',
            showing: 'Mostrando {count} de {total} estados',
        },
        cities: {
            title: 'Cidades',
            search: 'Pesquisar',
            add: 'Nova Cidade',
            fields: {
                name: 'Nome',
                state: 'Estado',
                actions: 'Ações',
            },
            modals: {
                register: {
                    title: 'Registrar Cidade',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Cidade registrada com sucesso',
                    error: 'Erro ao registrar cidade! Tente novamente.',
                },
                update: {
                    title: 'Atualizar Cidade',
                    confirm: 'Atualizar',
                    cancel: 'Cancelar',

                    success: 'Cidade atualizada com sucesso',
                    error: 'Erro ao atualizar cidade! Tente novamente.',
                },
                remove: {
                    title: 'Remover Cidade',
                    confirm: 'Remover',
                    cancel: 'Cancelar',
                    content: 'Deseja realmente remover a cidade {name}? Esta ação não poderá ser desfeita.',

                    success: 'Cidade removida com sucesso',
                    error: 'Erro ao remover cidade! Tente novamente.',
                }
            },
            empty: 'Nenhuma cidade encontrada',
            showing: 'Mostrando {count} de {total} cidades',
        },
        collection_locations: {
            title: 'Pontos de Coleta',
            search: 'Pesquisar',
            add: 'Novo Ponto de Coleta',
            fields: {
                name: 'Nome',
                city: 'Cidade',
                street: 'Rua',
                number: 'Número',
                complement: 'Complemento',
                actions: 'Ações',
            },
            modals: {
                register: {
                    title: 'Registrar Ponto de Coleta',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Ponto de Coleta registrado com sucesso',
                    error: 'Erro ao registrar ponto de coleta! Tente novamente.',
                },
                update: {
                    title: 'Atualizar Ponto de Coleta',
                    confirm: 'Atualizar',
                    cancel: 'Cancelar',

                    success: 'Ponto de Coleta atualizado com sucesso',
                    error: 'Erro ao atualizar ponto de coleta! Tente novamente.',
                },
                remove: {
                    title: 'Remover Ponto de Coleta',
                    confirm: 'Remover',
                    cancel: 'Cancelar',
                    content: 'Deseja realmente remover o ponto de coleta {name}? Esta ação não poderá ser desfeita.',

                    success: 'Ponto de Coleta removido com sucesso',
                    error: 'Erro ao remover ponto de coleta! Tente novamente.',
                }
            },
            empty: 'Nenhum ponto de coleta encontrado',
            showing: 'Mostrando {count} de {total} pontos de coleta',
        },
        donations: {
            title: 'Doações',
            search: 'Pesquisar',
            add: 'Nova Doação',
            fields: {
                user: 'Doador',
                date: 'Data',
                collection_location: 'Local de Coleta',
                actions: 'Ações',
            },
            modals: {
                register: {
                    title: 'Registrar Doação',
                    confirm: 'Registrar',
                    cancel: 'Cancelar',

                    success: 'Doação registrada com sucesso',
                    error: 'Erro ao registrar doação! Tente novamente.',
                },
                update: {
                    title: 'Atualizar Doação',
                    confirm: 'Atualizar',
                    cancel: 'Cancelar',

                    success: 'Doação atualizada com sucesso',
                    error: 'Erro ao atualizar doação! Tente novamente.',
                },
                remove: {
                    title: 'Remover Doação',
                    confirm: 'Remover',
                    cancel: 'Cancelar',
                    content: 'Deseja realmente remover a doação de {name}? Esta ação não poderá ser desfeita.',

                    success: 'Doação removida com sucesso',
                    error: 'Erro ao remover doação! Tente novamente.',
                }
            },
            empty: 'Nenhuma doação encontrada',
            showing: 'Mostrando {count} de {total} doações',
        }
    }
};