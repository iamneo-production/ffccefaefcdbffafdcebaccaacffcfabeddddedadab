
import { fireEvent, render, screen, waitFor, cleanup, queryByTestId, getByTestId, wait } from "@testing-library/react";
import Search from "../components/Search/Search";
import axios from 'axios';

jest.mock('axios');

describe('Search Component', () => {

    afterEach(cleanup);

    test('testcase1', async () => {

        const dataList = {
            data : [
                'R',
                ['R', 'Ring', 'Revengers', 'Robusted'],
                ['', '', '', '', ''],
                ['www.google.com', 'www.yahoo.com', 'www.duckduckgo.com', 'www.brave.com']
            ]
        }

        const { getAllByTestId, queryAllByTestId } = render(<Search />);

        axios.get.mockImplementationOnce(() => Promise.resolve(dataList));

        let flag = true;
        const searchname = ['R', 'Ring', 'Revengers', 'Robusted'];
        const searchLinks = ['www.google.com', 'www.yahoo.com', 'www.duckduckgo.com', 'www.brave.com']

        const suggestionList = await screen.findAllByTestId('suggestion');

        await suggestionList.forEach((suggestion, index) => {

            expect(suggestion.textContent).toBe(searchname[index]);
            expect(suggestion.getAttribute('href')).toBe(searchLinks[index])

        })

    })

    test('testcase2', async () => {

        const dataList = {
            data : [
                'R',
                ['R', 'Ring', 'Revengers', 'Robusted', 'Revamped'],
                ['', '', '', '', '', ''],
                ['www.google.com', 'www.yahoo.com', 'www.duckduckgo.com', 'www.brave.com', 'www.lickhack.go']
            ]
        }

        const { getAllByTestId, queryAllByTestId } = render(<Search />);

        axios.get.mockImplementationOnce(() => Promise.resolve(dataList));

        let searchname = [...dataList.data[1]];
        let searchLinks = [...dataList.data[3]];

        let suggestionList = await screen.findAllByTestId('suggestion');

        await suggestionList.forEach((suggestion, index) => {

            expect(suggestion.textContent).toBe(searchname[index]);
            expect(suggestion.getAttribute('href')).toBe(searchLinks[index])

        })

    });

    test('testcase3', async () => {

        const dataList = {
            data : [
                'R',
                ['R', 'Ring', 'Revengers', 'Robusted', 'Revamped'],
                ['', '', '', '', '', ''],
                ['www.google.com', 'www.yahoo.com', 'www.duckduckgo.com', 'www.brave.com', 'www.lickhack.go']
            ]
        }

        render(<Search />);

        axios.get.mockImplementationOnce(() => Promise.resolve(dataList));

        let searchname = [...dataList.data[1]];
        let searchLinks = [...dataList.data[3]];

        let suggestionList = await screen.findAllByTestId('suggestion');

        let input = screen.getByTestId('searchterm');

        await fireEvent.change(input, {target : {value : ''}});
        await new Promise((r) => setTimeout(r, 300));

        await waitFor(() => {
            expect(screen.queryAllByTestId('suggestion')).toEqual([]);
        })

    })

})