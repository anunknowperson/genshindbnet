import useStyles from './CharacterEdit.styles'

import { useTranslation } from 'next-i18next';

import { ActionIcon, BackgroundImage, Button } from '@mantine/core';

import { useViewportSize } from '@mantine/hooks';

import { Text } from '@mantine/core';

import Image from 'next/image';
import { useWindowScroll } from '@mantine/hooks';
import { TextFormat } from '../TextFormat/TextFormat';

import { Paper } from '@mantine/core';

import { ContentPanel } from '../ContentPanel/ContentPanel'

import { useRef, useState } from 'react';

import { Slider } from '@mantine/core';

import { Checkbox } from '@mantine/core';

import { Divider } from '@mantine/core';

import { TalentView } from '../Characters/TalentView/TalentView';
import { PassiveView } from '../Characters/PassiveView/PassiveView';
import { ConstellationView } from '../Characters/ConstellationView/ConstellationView';

import { WeaponAscension } from '../Weapons/WeaponAscension/WeaponAscension';
import { TalentAscension } from '../Characters/TalentAscension/TalentAscension';

import { ArtifactsLine } from '../Characters/ArtifactsLine/ArtifactsLine';

import { WeaponLine } from '../Characters/WeaponLine/WeaponLine';

import { TeamLine } from '../Characters/TeamLine/TeamLine';


import parse from 'html-react-parser';

export function CharacterPostView({ ed, character, initMainContent, mainContentChangeCallback, initWeapons, weaponsChangeCallback, initArtifacts, artifactsChangeCallback, initComments, commentsChangeCallback, initTeams, teamsChangeCallback }) {
    const Editor = ed;

    const { classes } = useStyles();

    const { t } = useTranslation(['common']);
    const { height, width } = useViewportSize();

    const [level, setLevel] = useState(9);
    const [tlevel, settLevel] = useState(10);

    const [ascension, setAscension] = useState(true);
    const [progression, setProgression] = useState(true);
    const [tprogression, settProgression] = useState(true);

    const [artifactLines, setArtifactLines] = useState(initArtifacts);
    const [weaponLines, setWeaponLines] = useState(initWeapons);
    const [teamLines, setTeamLines] = useState(initTeams);

    const talentsHeader = useRef(null);
    const passiveTalentsHeader = useRef(null);
    const constellationsHeader = useRef(null);
    const ascensionHeader = useRef(null);


    var sliderMarks = [
        { value: 0, label: '1' },
    ];
    var tsliderMarks = [];

    for (var i = 10; i <= 90; i += 10) {
        sliderMarks.push({ value: i / 10, label: i.toString() });
    }

    for (var i = 1; i <= 10; i += 1) {
        tsliderMarks.push({ value: i, label: i.toString() });
    }

    const getStat = (name) => {


        var query;
        if (level == 0) {
            query = '1';
        } else {
            query = level + '0';
        }

        if (ascension) {
            if (query != '90' && query != '30' && query != '10' && query != '1') {
                query += '+';
            }
        }

        var res;
        res = Math.round(character.stats[query][name] * 10000) / 10000;

        if (res < 1) {
            res *= 100;
            res = Math.round(res * 10) / 10;
            res += '%';
        } else {
            res = Math.round(res * 100) / 100;
        }

        return res;
    }

    const removeLine = (id) => {

        var newLines = artifactLines.filter((_, i) => { return i !== id; });

        setArtifactLines(newLines);

        artifactsChangeCallback(newLines);
    }

    const changeLine = (id, field, val) => {
        var newLines = [...artifactLines];

        newLines[id][field] = val;



        setArtifactLines(newLines);

        artifactsChangeCallback(newLines);
    }

    const removeWeaponLine = (id) => {

        var newLines = weaponLines.filter((_, i) => { return i !== id; });

        setWeaponLines(newLines);

        weaponsChangeCallback(newLines);
    }

    const changeWeaponLine = (id, field, val) => {
        var newLines = [...weaponLines];


        newLines[id][field] = val;

        setWeaponLines(newLines);

        weaponsChangeCallback(newLines);
    }

    const removeTeamLine = (id) => {

        var newLines = teamLines.filter((_, i) => { return i !== id; });

        setTeamLines(newLines);

        teamsChangeCallback(newLines);
    }

    const changeTeamLine = (id, field, val) => {
        var newLines = [...teamLines];

        newLines[id][field] = val;

        setTeamLines(newLines);

        teamsChangeCallback(newLines);
    }

    return (

        <>
            <BackgroundImage
                src="/guidebg.jpg"
                radius="sm"

            >
                <div className={classes.topContainer}>
                    <div className={classes.imgName}>


                        <div className={classes.cardImage}>
                            <Image alt="card" style={{ objectFit: 'contain' }} fill src={`/resources/${character.images.nameiconcard}.png`}></Image>
                        </div>

                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text fz={30} c='white'>{character.name}</Text>
                            <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                                <Text fz={20}>{character.rarity}</Text>
                                <Image alt="star" src='/star.svg' width={15} height={15} />
                                <Text ml={5} fz={20}> - <TextFormat>{character.element}</TextFormat> {character.weapontype}</Text>
                            </div>

                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row-reverse', flex: '1' }}>

                        <div style={{ height: '100%', display: 'flex' }}>

                            <div style={{ marginRight: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>

                                <Text c={'white'} ml={5} fz={18}>{t('c_fullname')}</Text>
                                <Text c={'white'} ml={5} fz={18}>{t('c_title')}</Text>
                                <Text c={'white'} ml={5} fz={18}>{t('c_region')}</Text>
                                <Text c={'white'} ml={5} fz={18}>{t('c_affiliation')}</Text>
                                <Text c={'white'} ml={5} fz={18}>{t('c_birthday')}</Text>
                            </div>

                            <div style={{ marginRight: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>

                                <Text c={'white'} ml={5} fz={18}>{character.name}</Text>
                                <Text c={'white'} ml={5} fz={18}>{character.title}</Text>
                                <Text c={'white'} ml={5} fz={18}>{character.region}</Text>
                                <Text c={'white'} ml={5} fz={18}>{character.affiliation}</Text>
                                <Text c={'white'} ml={5} fz={18}>{character.birthday}</Text>
                            </div>

                        </div>

                    </div>
                </div>
            </BackgroundImage>

            <div className={classes.buttonContainer}>


                <Button className={classes.buttons} onClick={() => talentsHeader.current.scrollIntoView()}>
                    {t('c_talents')}
                </Button>

                <Button className={classes.buttons} onClick={() => passiveTalentsHeader.current.scrollIntoView()}>
                    {t('c_passivetalents')}
                </Button>
                <Button className={classes.buttons} onClick={() => constellationsHeader.current.scrollIntoView()}>
                    {t('c_constellations')}
                </Button>

                <Button className={classes.buttons} onClick={() => ascensionHeader.current.scrollIntoView()} >
                    {t('c_ascensioncosts')}
                </Button>


            </div>

            <Paper mt={10} shadow="xs" p="md" withBorder>
                <Text fs="italic" ta="center">
                    {character.description}
                </Text>
            </Paper>


            {parse(initMainContent)}


            <div className={classes.waContainer}>

                <div style={{ flex: '1' }}>
                    <h2>{t('h_weapons')}</h2>

                    {weaponLines.map((el, index) => (
                        <WeaponLine readOnly={true} id={index} key={el.uid} selected={el.selected} comment={el.comment} weaponType={character.weapontypeint}></WeaponLine>
                    ))}

                </div>

                <div style={{ flex: '1' }}>
                    <h2>{t('h_artifacts')}</h2>


                    {artifactLines.map((el, index) => (
                        <ArtifactsLine readOnly={true} id={index} key={el.uid} type={el.type} twoP={el.twoP} fourP={el.fourP} comment={el.comment}></ArtifactsLine>
                    ))}


                </div>

            </div>

            <h2>{t('h_teams')}</h2>

            {teamLines.map((el, index) => (
                <TeamLine readOnly={true} id={index} key={el.uid} selected1={el.c1} selected2={el.c2} selected3={el.c3} selected4={el.c4} comment={el.comment} />
            ))}



            <div style={{ marginTop: '10px' }}>
                <ContentPanel>


                    <Checkbox style={{ paddingTop: '20px', paddingLeft: '20px', paddingBottom: '10px' }}
                        checked={ascension}
                        onChange={(event) => setAscension(event.currentTarget.checked)}
                        label={t('ascended')}
                    />

                    <Slider

                        value={level} onChange={setLevel}

                        style={{ padding: '20px 20px 30px 20px', width: '100%' }} marks={(width > 750) ? sliderMarks : undefined} max={9} label={null} />

                    <Divider my="sm" />

                    <div style={{ padding: '0px 10px 10px 10px' }}>
                        <div className={classes.stats}>
                            {(width < 751) &&
                                <div style={{ display: 'flex', flexDirection: 'row' }}>Level: {<Text ml={10} c={'white'}>{(level == 0) ? '1' : (level + '0')}</Text>}</div>
                            }

                            <div style={{ display: 'flex', flexDirection: 'row' }}>HP: <Text ml={10} c={'white'}>{getStat('hp')}</Text></div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>ATK: <Text ml={10} c={'white'}>{getStat('attack')}</Text></div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>DEF: <Text ml={10} c={'white'}>{getStat('defense')}</Text></div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}><TextFormat>{character.substat}</TextFormat>: <Text ml={10} c={'white'}>{getStat('specialized')}</Text></div>
                        </div>
                    </div>

                </ContentPanel>

                <h2 ref={talentsHeader}>{t('c_talents')}</h2>

                <div className={classes.rows}>

                    <TalentView readOnly={true} talent={character.talents.combat1} image={character.talents.images.combat1} nick={'t1'} comment={initComments['t1']} commentCallback={commentsChangeCallback} />
                    <TalentView readOnly={true} talent={character.talents.combat2} image={character.talents.images.combat2} nick={'t2'} comment={initComments['t2']} commentCallback={commentsChangeCallback} />
                    <TalentView readOnly={true} talent={character.talents.combat3} image={character.talents.images.combat3} nick={'t3'} comment={initComments['t3']} commentCallback={commentsChangeCallback} />

                    {(character.talents.combatsp != undefined) &&
                        <TalentView readOnly={true} talent={character.talents.combatsp} image={character.talents.images.combatsp} nick={'t4'} comment={initComments['t4']} commentCallback={commentsChangeCallback} />
                    }
                </div>

                <h2 ref={passiveTalentsHeader}>{t('c_passivetalents')}</h2>

                <div className={classes.rows}>

                    <PassiveView readOnly={true} talent={character.talents.passive1} image={character.talents.images.passive1} nick={'p1'} comment={initComments['p1']} commentCallback={commentsChangeCallback} />
                    <PassiveView readOnly={true} talent={character.talents.passive2} image={character.talents.images.passive2} nick={'p2'} comment={initComments['p2']} commentCallback={commentsChangeCallback} />


                    {(character.talents.passive3 != undefined) &&
                        <PassiveView readOnly={true} talent={character.talents.passive3} image={character.talents.images.passive3} nick={'p3'} comment={initComments['p3']} commentCallback={commentsChangeCallback} />
                    }
                </div>

                <h2 ref={constellationsHeader}>{t('c_constellations')}</h2>

                <div className={classes.rows}>

                    <ConstellationView readOnly={true} talent={character.constellations.c1} image={character.constellations.images.c1} nick={'c1'} comment={initComments['c1']} commentCallback={commentsChangeCallback} />
                    <ConstellationView readOnly={true} talent={character.constellations.c2} image={character.constellations.images.c2} nick={'c2'} comment={initComments['c2']} commentCallback={commentsChangeCallback} />
                    <ConstellationView readOnly={true} talent={character.constellations.c3} image={character.constellations.images.c3} nick={'c3'} comment={initComments['c3']} commentCallback={commentsChangeCallback} />
                </div>

                <div className={classes.rows}>
                    <ConstellationView readOnly={true} talent={character.constellations.c4} image={character.constellations.images.c4} nick={'c4'} comment={initComments['c4']} commentCallback={commentsChangeCallback} />
                    <ConstellationView readOnly={true} talent={character.constellations.c5} image={character.constellations.images.c5} nick={'c5'} comment={initComments['c5']} commentCallback={commentsChangeCallback} />
                    <ConstellationView readOnly={true} talent={character.constellations.c6} image={character.constellations.images.c6} nick={'c6'} comment={initComments['c6']} commentCallback={commentsChangeCallback} />
                </div>

                <h2 ref={ascensionHeader}>{t('c_ascensioncosts')}</h2>

                <ContentPanel>
                    <div style={{ padding: '10px 10px 1px 10px' }}>
                        <div style={{ padding: '20px 20px 30px 20px', width: '100%' }}>


                            <Slider

                                value={level} onChange={setLevel}

                                marks={(width > 750) ? sliderMarks : undefined} max={9} label={null} />
                        </div>
                        <Checkbox style={{ paddingTop: '20px', paddingLeft: '20px', paddingBottom: '10px' }}
                            checked={progression}
                            onChange={(event) => setProgression(event.currentTarget.checked)}
                            label={t('full_progression')}
                        />
                        {(width < 751) &&
                            <div style={{ display: 'flex', flexDirection: 'row' }}>Level: {<Text ml={10} c={'white'}>{(level == 0) ? '1' : (level + '0')}</Text>}</div>
                        }
                        <WeaponAscension level={level} progression={progression} costs={character.costs} />
                    </div>
                </ContentPanel>

                <h2>{t('c_talentascensioncosts')}</h2>

                <ContentPanel>
                    <div style={{ padding: '10px 10px 1px 10px' }}>
                        <div style={{ padding: '20px 20px 30px 20px', width: '100%' }}>


                            <Slider

                                value={tlevel} onChange={settLevel}

                                marks={(width > 750) ? tsliderMarks : undefined} min={1} max={10} label={null} />
                        </div>
                        <Checkbox style={{ paddingTop: '20px', paddingLeft: '20px', paddingBottom: '10px' }}
                            checked={tprogression}
                            onChange={(event) => settProgression(event.currentTarget.checked)}
                            label={t('full_progression')}
                        />
                        {(width < 751) &&
                            <div style={{ display: 'flex', flexDirection: 'row' }}>Level: {<Text ml={10} c={'white'}>{tlevel}</Text>}</div>
                        }
                        <TalentAscension level={tlevel} progression={tprogression} costs={character.talentcosts} />
                    </div>
                </ContentPanel>
            </div>

        </>
    );
}
