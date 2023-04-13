import { useState, useEffect } from 'react';
import { Bracket, IRoundProps, Seed, SeedItem, SeedTeam } from 'react-brackets';
import { Series, BracketInfo, getBracketInfo } from 'services/recim/series';
import { standardDate } from '../Helpers';
import { IRenderSeedProps } from 'react-brackets';
import { Link } from 'react-router-dom';
import styles from './RecIMBracket.module.css';
import GordonLoader from 'components/Loader';

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }: IRenderSeedProps) => {
  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <Link to={`match/${seed.id}`} className={styles.bracketMatchLink}>
        <SeedItem>
          <div>
            <SeedTeam>
              {seed.teams[0]?.name || '----------- '}
              <span className={styles.score}>{seed.teams[0]?.score}</span>
            </SeedTeam>
            <SeedTeam>
              {seed.teams[1]?.name || '----------- '}
              <span className={styles.score}>{seed.teams[1]?.score}</span>
            </SeedTeam>
          </div>
        </SeedItem>
      </Link>
    </Seed>
  );
};

const RecIMBracket = ({ series }: { series: Series }) => {
  const [bracketInfo, setBracketInfo] = useState<BracketInfo[]>();
  const [rounds, setRounds] = useState<IRoundProps[]>();

  useEffect(() => {
    const loadBracketInfo = async () => {
      const request = await getBracketInfo(series.ID);
      setBracketInfo(request as BracketInfo[]);
    };
    loadBracketInfo();
  }, [series.ID]);

  useEffect(() => {
    const generateBracket = async () => {
      if (!bracketInfo || !series?.Match) return;

      // merge data: series match info + bracket info
      const data = series.Match.map((matchS) => ({
        ...bracketInfo.find((matchB) => matchB.MatchID === matchS.ID),
        ...matchS,
      }));

      // consider changing the typing strategy here
      // BracketMatchInfo has the combined properties of Match && BracketInfo, but using this errors
      type BracketMatchInfo = {
        [key: string]: any;
      };

      let dataRounds = data.reduce(function (
        memo: { [key: string]: BracketMatchInfo[] },
        x: BracketMatchInfo,
      ) {
        if (!memo[x['RoundNumber']]) {
          memo[x['RoundNumber']] = [];
        }
        memo[x['RoundNumber']].push(x);
        return memo;
      },
      {});

      // iterate through each round
      for (const key in dataRounds) {
        dataRounds[key].sort((a, b) => a.SeedIndex - b.SeedIndex);

        // check if 0 seed doesn't exist
        const newArray: BracketMatchInfo[] = [];
        if (dataRounds[key][0].SeedIndex !== 0) {
          const newObj: BracketMatchInfo = {
            SeedIndex: 0,
            Activity: null,
            Attendance: null,
            ID: null,
            IsLosers: false,
            MatchID: null,
            RoundNumber: 12,
            RoundOf: null,
            Scores: [],
            Series: null,
            StartTime: null,
            Status: null,
            Surface: null,
            Team: [],
          };
          newArray.push(newObj);
        }
        for (let i = 0; i < dataRounds[key].length; i++) {
          newArray.push(dataRounds[key][i]);

          if (
            i < dataRounds[key].length - 1 &&
            dataRounds[key][i + 1].SeedIndex - dataRounds[key][i].SeedIndex > 1
          ) {
            const missingIndexes =
              dataRounds[key][i + 1].SeedIndex - dataRounds[key][i].SeedIndex - 1;

            for (let j = 0; j < missingIndexes; j++) {
              const newNum = dataRounds[key][i].SeedIndex + j + 1;
              const newObj: BracketMatchInfo = {
                SeedIndex: newNum,
                Activity: null,
                Attendance: null,
                ID: null,
                IsLosers: false,
                MatchID: null,
                RoundNumber: null,
                RoundOf: null,
                Scores: [],
                Series: null,
                StartTime: null,
                Status: null,
                Surface: null,
                Team: [],
              };
              newArray.push(newObj);
            }
          }
        }
        dataRounds[key] = newArray;
      }

      setRounds(
        Object.keys(dataRounds).map((index) => {
          let roundNum = parseInt(index);
          let roundOf = dataRounds[roundNum][0]?.RoundOf;
          return {
            title: roundOf === 2 ? 'Finals' : roundOf === 4 ? 'Semifinals' : 'Round ' + roundNum,
            seeds: dataRounds[index].map((match) => {
              return {
                // using random id to prevent unique key error
                id: match.MatchID ?? Math.random(),
                date: match.StartTime ? standardDate(match.StartTime, true) : '',
                teams: [
                  {
                    name: match.Team[0]?.Name ?? '',
                    score:
                      match.Status === 'Completed' &&
                      match.Scores.find((s: any) => s.TeamID === match.Team[0]?.ID)?.TeamScore,
                  },
                  {
                    name: match.Team[1]?.Name ?? '',
                    score:
                      match.Status === 'Completed' &&
                      match.Scores.find((s: any) => s.TeamID === match.Team[1]?.ID)?.TeamScore,
                  },
                ],
              };
            }),
          };
        }),
      );
    };

    generateBracket();
  }, [bracketInfo, series.Match]);

  return rounds ? <Bracket rounds={rounds} renderSeedComponent={CustomSeed} /> : <GordonLoader />;
};

export default RecIMBracket;
