import axios from 'axios';

const DB_URL = import.meta.env.VITE_DB_URL;
const HEADERS = {
    'Content-Type': 'application/json',
};

const useDashboard = () => {
    const fetchTypes = async () => {
        try {
            const { data: types } = await axios.get(`${DB_URL}/tipo_sanguineo`, {
                headers: HEADERS,
            });

            const typesOrderedByType = types.sort((a, b) => a.tipo.localeCompare(b.tipo));
            return typesOrderedByType;
        } catch (error) {
            console.error('useDashboard:fetchTypes Error fetching types: ', error);
        }
    }

    const registerType = async (type) => {
        try {
            const { data: response } = await axios.post(`${DB_URL}/tipo_sanguineo`, type, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:registerType Error registering type: ', error);
        }
    }

    const updateType = async (type) => {
        try {
            const { data: response } = await axios.put(`${DB_URL}/tipo_sanguineo/${type.id}`, type, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:updateType Error updating type: ', error);
        }
    }

    const removeType = async (typeId) => {
        try {
            const { data: response } = await axios.delete(`${DB_URL}/tipo_sanguineo/${typeId}`, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:removeType Error removing type: ', error);
        }
    }

    const fetchUsers = async () => {
        try {
            const { data: users } = await axios.get(`${DB_URL}/pessoa`, {
                headers: HEADERS,
            });

            const usersOrderedByName = users.sort((a, b) => 
                a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
            );
            
            return usersOrderedByName;
        } catch (error) {
            console.error('useDashboard:fetchUsers Error fetching users: ', error);
        }
    }

    const registerUser = async (user) => {
        try {
            const { data: response } = await axios.post(`${DB_URL}/pessoa`, user, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:registerUser Error registering user: ', error);
        }
    }

    const updateUser = async (user) => {
        try {
            const { data: response } = await axios.put(`${DB_URL}/pessoa/${user.id}`, user, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:updateUser Error updating user: ', error);
        }
    }

    const removeUser = async (userId) => {
        try {
            const { data: response } = await axios.delete(`${DB_URL}/pessoa/${userId}`, {
                headers: HEADERS,
            });

            return response;

        } catch (error) {
            console.error('useDashboard:removeUser Error removing user: ', error);
        }
    }

    const fetchCities = async () => {
        try {
            const { data: cities } = await axios.get(`${DB_URL}/cidade`, {
                headers: HEADERS,
            });

            const citiesOrderedByName = cities.sort((a, b) => a.nome.localeCompare(b.nome));
            return citiesOrderedByName;
        } catch (error) {
            console.error('useDashboard:fetchCities Error fetching cities: ', error);
        }
    }

    const registerCity = async (city) => {
        try {
            const { data: response } = await axios.post(`${DB_URL}/cidade`, city, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:registerCity Error registering city: ', error);
        }
    }

    const updateCity = async (city) => {
        try {
            const { data: response } = await axios.put(`${DB_URL}/cidade/${city.id}`, city, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:updateCity Error updating city: ', error);
        }
    }

    const removeCity = async (cityId) => {
        try {
            const { data: response } = await axios.delete(`${DB_URL}/cidade/${cityId}`, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:removeCity Error removing city: ', error);
        }
    }

    const fetchStates = async () => {
        try {
            const { data: states } = await axios.get(`${DB_URL}/estado`, {
                headers: HEADERS,
            });

            const statesOrderedByName = states.sort((a, b) => a.nome.localeCompare(b.nome));
            return statesOrderedByName;
        } catch (error) {
            console.error('useDashboard:fetchStates Error fetching states: ', error);
        }
    }

    const registerState = async (state) => {
        try {
            const { data: response } = await axios.post(`${DB_URL}/estado`, state, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:registerState Error registering state: ', error);
        }
    }

    const updateState = async (state) => {
        try {
            const { data: response } = await axios.put(`${DB_URL}/estado/${state.id}`, state, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:updateState Error updating state: ', error);
        }
    }

    const removeState = async (stateId) => {
        try {
            const { data: response } = await axios.delete(`${DB_URL}/estado/${stateId}`, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:removeState Error removing state: ', error);
        }
    }

    const fetchCollectionLocations = async () => {
        try {
            const { data: collectionLocations } = await axios.get(`${DB_URL}/local_coleta`, {
                headers: HEADERS,
            });

            const collectionLocationsOrderedByName = collectionLocations.sort((a, b) => a.nome.localeCompare(b.nome));
            return collectionLocationsOrderedByName;
        } catch (error) {
            console.error('useDashboard:fetchCollectionLocations Error fetching collection locations: ', error);
        }
    }

    const registerCollectionLocation = async (collectionLocation) => {
        try {
            const { data: response } = await axios.post(`${DB_URL}/local_coleta`, collectionLocation, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:registerCollectionLocation Error registering collection location: ', error);
        }
    }

    const updateCollectionLocation = async (collectionLocation) => {
        try {
            const { data: response } = await axios.put(`${DB_URL}/local_coleta/${collectionLocation.id}`, collectionLocation, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:updateCollectionLocation Error updating collection location: ', error);
        }
    }

    const removeCollectionLocation = async (collectionLocationId) => {
        try {
            const { data: response } = await axios.delete(`${DB_URL}/local_coleta/${collectionLocationId}`, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:removeCollectionLocation Error removing collection location: ', error);
        }
    }

    const fetchDonations = async () => {
        try {
            const { data: donations } = await axios.get(`${DB_URL}/doacao`, {
                headers: HEADERS,
            });

            const donationsOrderedByDate = donations.sort((a, b) => new Date(b.data) - new Date(a.data));
            return donationsOrderedByDate;
        } catch (error) {
            console.error('useDashboard:fetchDonations Error fetching donations: ', error);
        }
    }

    const registerDonation = async (donation) => {
        try {
            const { data: response } = await axios.post(`${DB_URL}/doacao`, donation, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:registerDonation Error registering donation: ', error);
        }
    }

    const updateDonation = async (donation) => {
        try {
            const { data: response } = await axios.put(`${DB_URL}/doacao/${donation.id}`, donation, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:updateDonation Error updating donation: ', error);
        }
    }

    const removeDonation = async (donationId) => {
        try {
            const { data: response } = await axios.delete(`${DB_URL}/doacao/${donationId}`, {
                headers: HEADERS,
            });

            return response;
        } catch (error) {
            console.error('useDashboard:removeDonation Error removing donation: ', error);
        }
    }

    return {
        fetchTypes,
        registerType,
        updateType,
        removeType,
        fetchUsers,
        registerUser,
        updateUser,
        removeUser,
        fetchCities,
        registerCity,
        updateCity,
        removeCity,
        fetchStates,
        registerState,
        updateState,
        removeState,
        fetchCollectionLocations,
        registerCollectionLocation,
        updateCollectionLocation,
        removeCollectionLocation,
        fetchDonations,
        registerDonation,
        updateDonation,
        removeDonation,
    };
};

export default useDashboard;