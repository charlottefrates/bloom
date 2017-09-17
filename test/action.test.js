
//import * as actions from '../src/actions/zone_actions';
//import * as types from '../src/actions/zone_actions';
//import axios from 'axios';
//import MockAdapter from 'axios-mock-adapter';

xdescribe('zone_actions', () => {
    it(' create_zone should return the action', () => {
        const name = 'Zone 1';
        const id = Math.random().toString(34).slice(2);;
        expect(action.type).toEqual(CREATE_ZONE);
        expect(action.name).toEqual(name);
    });
    it(' save_zone should return the action', () => {
        const name = 'Zone 1';
        const id = Math.random().toString(34).slice(2);;
        expect(action.type).toEqual(SAVE_ZONE);
        expect(action.name).toEqual(name);
    });
    it(' edit_zone should return the action', () => {
        expect(action.type).toEqual(EDIT_ZONE);
    });
    it(' delete_zone should return the action', () => {
        expect(action.type).toEqual(DELETE_ZONE);
    });
    it(' select_days should return the action', () => {
        expect(action.type).toEqual(SELECT_DAYS);
    });
    it(' clear_selected_days should return the action', () => {
        expect(action.type).toEqual(CLEAR_SELECTED_DAYS);
    });
    it(' select_zone should return the action', () => {
        expect(action.type).toEqual(SELECT_ZONE);
    });
    it(' set_time should return the action', () => {
        const min = '60';
        expect(action.type).toEqual(SET_TIME);
    });
    it(' set_watering should return the action', () => {
        const gal = '2';
        const action = addList(title);
        expect(action.type).toEqual(SET_WATERING);
    });
    it(' set_projected should return the action', () => {
        expect(action.type).toEqual(SET_PROJECTED);
    });
});


xdescribe('authentication_actions', () => {

    it(' auth_user should return an action', () => {
        expect(action.type).toEqual(AUTH_USER);

    });
    it(' unauth_error should return an action', () => {
        expect(action.type).toEqual(AUTH_ERROR);

    });
    it(' registerUser action creator should register a new user', () => {
        let mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet('https://bloom-water-tracker.herokuapp.com/signup').reply(200, data);

    });
    it(' loginUser action creator should allow the user to log in', () => {
        let mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet('https://bloom-water-tracker.herokuapp.com/signin').reply(200, data);


    });
    it(' logoutUser action creator should clear localStorage and logout user', () => {
        const dispatch = expect(action.type).toEqual(UNAUTH_USER);
         expect(dispatch);

    });
});

xdescribe('history_actions', () => {
    it(' save_entry should return the action', () => {
        expect(action.type).toEqual(SAVE_ENTRY);
    });
});

xdescribe('weather_actions', () => {
    it(' pull-weather should return the action', () => {
        expect(action.type).toEqual(PULL_WEATHER);
    });
    it(' set_data should return the action', () => {
        expect(action.type).toEqual(SET_DATA);
    });
    it(' set_current should return the action', () => {
        expect(action.type).toEqual(SET_CURRENT);
    });
    it(' set_array should return the action', () => {
        expect(action.type).toEqual(SET_ARRAY);
    });
});
