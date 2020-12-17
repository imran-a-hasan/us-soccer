import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

function Players() {

    const [players, setPlayers] = useState(null);

    const generateRows = useCallback(() => {
        const rows = [];
        players.forEach(player => {
            rows.push(
                {
                    player: <span>
                                <Link to={`/players/${player.playerId}`}>
                                    <Image className='players-table-img' src={`/images/${player.imageId}.png`} roundedCircle />
                                    <span className='players-table-name'>{player.playerName}</span>
                                </Link>
                            </span>,
                    team: <span>
                            <ReactTooltip id={`team-img-${player.teamName}`} place='bottom' effect='solid'>
                                {player.teamName}
                            </ReactTooltip>
                            <Image data-tip data-for={`team-img-${player.teamName}`} className='home-team-img' src={player.teamLogo} />
                        </span>,
                    games: player.appearances,
                    minutes: player.minutesPlayed,
                    goals: player.goals,
                    assists: player.assists
                }
            )
        })
        return rows;
    }, [players]);

    useEffect(() => {
        if (!players) {
            fetch('https://f07ibfl0dg.execute-api.us-east-1.amazonaws.com/GetPlayers')
            .then(res => res.json())
            .then(res => setPlayers(res));
        }
    }, [players]);

    const data = useMemo(
        () => {
            if (players) {
                return generateRows();
            } else {
                return [];
            }
        }, [players, generateRows]
    );

    const columns = useMemo(
        () => [
            {
                Header: 'Player',
                accessor: 'player'
            },
            {
                Header: 'Team',
                accessor: 'team'
            },
            {
                Header: 'Games',
                accessor: 'games'
            },
            {
                Header: <span role='img' aria-label='minutes played'>&#x23F1;</span>,
                accessor: 'minutes'
            },
            {
                Header: <span role='img' aria-label='goal'>&#9917;</span>,
                accessor: 'goals'
            },
            {
                Header: <span role='img' aria-label='assist'>&#x1F170;</span>,
                accessor: 'assists'
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data}, useSortBy);

    function showPlayers() {
        return (
            <Table {...getTableProps()} className='players-table'>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            className='players-table-header'
                        >
                            {column.render('Header')}
                            <span>
                                {column.isSorted
                                ? column.isSortedDesc
                                    ? '🔽'
                                    : '🔼'
                                : ''}
                            </span>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                            <td
                                {...cell.getCellProps()}
                            >
                                {cell.render('Cell')}
                            </td>
                            )
                        })}
                        </tr>
                    )
                    })}
                </tbody>
            </Table>
        );
    }

    return (
        <div>
            {players && showPlayers()}
        </div>
    )
}

export default Players;