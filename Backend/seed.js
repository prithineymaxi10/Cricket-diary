const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const T20I = require('./models/T20I');
const ODI = require('./models/ODI');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set in your .env file.');
    console.error('See ATLAS_SETUP.md for how to get a MongoDB Atlas connection string.');
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    console.error('Double-check MONGODB_URI in your .env file (username, password, cluster address).');
    console.error('See ATLAS_SETUP.md for help.');
    process.exit(1);
});

const t20iData = {
    seriesInfo: {
        name: 'India vs England T20I Series 2026',
        status: 'completed',
        result: 'England 4-0',
        startDate: new Date('2026-07-01'),
        endDate: new Date('2026-07-12')
    },

    featuredArticle: {
        title: 'England Dominates With Historic 4-0 Series Victory',
        subtitle: 'Clinical performances from batting and bowling units establish clear superiority across all five matches',
        content: 'England demonstrated exceptional cricket across all five matches, securing a dominant 4-0 series victory against India in the T20I format. The clinical performances from England\'s batting and bowling units contrasted sharply with India\'s struggles, particularly highlighted by their inability to adapt to challenging conditions and express pace bowling. This overwhelmingly one-sided series marks a watershed moment in the bilateral cricket relationship, with England establishing clear superiority across formats. The series showcased a stark clash between experience and youth: England fielded a battle-hardened squad with accomplished international players, while India\'s team was laden with debutants making their maiden international appearance in challenging English conditions.',
        badge: 'Breaking News',
        date: new Date('2026-07-12'),
        author: 'Sports Bureau'
    },

    statistics: [
        { label: 'Series Result', value: '4-0', description: 'England Victory' },
        { label: 'Highest Team Score', value: '257', description: 'England, 5th T20I' },
        { label: 'Highest Individual Score', value: '131', description: 'Jos Butler, 64 balls' },
        { label: 'Highest Partnership', value: '233', description: 'Butler-Brook, 5th T20I' }
    ],

    matches: [
        {
            matchNumber: 1,
            title: 'First T20I: Rain Intervention',
            excerpt: 'India posted 189/7 before rain halted England\'s chase, resulting in a no-result that denied a full contest.',
            category: 'Match Report',
            date: new Date('2026-07-03'),
            result: 'No Result',
            content: 'India\'s opening match produced a score of 189 runs for seven wickets, establishing a competitive platform built on brisk contributions through the middle overs. However, rain intervened before England could complete their chase, resulting in a no-result and denying India the opportunity to test their bowling attack against a professional English batting order under pressure. The abandonment left both camps with unanswered questions heading into the second fixture, with India\'s team management particularly frustrated at losing a chance to build momentum after a promising batting effort.',
            teams: { team1: 'India', team1Score: '189/7', team2: 'England', team2Score: 'No play' }
        },
        {
            matchNumber: 2,
            title: 'Second T20I: Precision Chase',
            excerpt: 'Jacob Bethell (76) and Harry Brook (39) guide England\'s successful pursuit of 190 in 19.1 overs.',
            category: 'Match Report',
            date: new Date('2026-07-05'),
            result: 'England won',
            content: 'India posted 190 runs across their twenty overs through contributions from Abhishek Sharma, Ishan Kishan, Shreyas Iyer, and Tilak Varma\'s last-over cameo. England\'s bowlers gave away breakthroughs at regular intervals but kept the required rate manageable. In the chase, India\'s total was overhauled in 19.1 overs thanks to Harry Brook\'s quickfire 15-ball 39 and Jacob Bethell\'s calculative 76 from 46 balls, a knock built on sound cricketing shots rather than pure aggression. The pair\'s contrasting approaches — Bethell\'s calm accumulation and Brook\'s late explosiveness — proved the difference between the sides.',
            teams: { team1: 'India', team1Score: '190/7', team2: 'England', team2Score: '191/4 (19.1 ov)' }
        },
        {
            matchNumber: 3,
            title: 'Third T20I: Complete Dominance',
            excerpt: 'England posted 201, while Jofra Archer and Josh Tongue dismantled India for just 76 — the series\' lowest total.',
            category: 'Match Report',
            date: new Date('2026-07-07'),
            result: 'England won',
            content: 'England crossed the 200 mark for the first time in this series, scoring 201 for seven. Phil Salt fought his way to 70 after a slow start, with Jos Buttler laying a solid foundation and Sam Curran providing the final flourish with a 24-ball 41. In reply, India were blown away by the pace of Jofra Archer (3-0-29-3) and Josh Tongue (4-0-28-4), bundled out for just 76 in a humiliating display that exposed clear technical gaps against extreme pace and steep bounce. The collapse — from a promising start to all-out inside 15 overs — became a turning point that shaped the psychological complexion of the remainder of the series.',
            teams: { team1: 'England', team1Score: '201/7', team2: 'India', team2Score: '76' }
        },
        {
            matchNumber: 4,
            title: 'Fourth T20I: Captain\'s Resistance',
            excerpt: 'Shreyas Iyer\'s unbeaten 80 provides resistance as India posted 158, but England chased comfortably.',
            category: 'Match Report',
            date: new Date('2026-07-09'),
            result: 'England won',
            content: 'Captain Shreyas Iyer demonstrated personal resilience with an unbeaten 80, providing India\'s innings with genuine substance and showcasing the quality that saw him handed the leadership. India assembled 158 for seven in a counter-attacking display that briefly hinted at a competitive total. However, England\'s response proved consummate, with Phil Salt and Harry Brook brushing aside the target with more than an over to spare. This was a contest between two captains under scrutiny — Iyer fighting to keep India competitive individually, Brook demonstrating the clinical finishing that has defined his white-ball game this year.',
            teams: { team1: 'India', team1Score: '158/7', team2: 'England', team2Score: '159/5 (19.0 ov)' }
        },
        {
            matchNumber: 5,
            title: 'Fifth T20I: Record-Breaking Performance',
            excerpt: 'Jos Butler (131) and Harry Brook (95) put on a 233-run stand as England post a series-high 257.',
            category: 'Match Report',
            date: new Date('2026-07-11'),
            result: 'England won',
            content: 'England unleashed their most dominant batting performance of the series, posting 257 for three, courtesy of Jos Butler\'s extraordinary 131 off 64 balls and Harry Brook\'s 95 off 45. The pair stitched together a mammoth 233-run partnership — England\'s highest partnership in T20I history — built on a blend of controlled aggression and pure power-hitting through the arc. Butler\'s 131 stands as the highest individual score by any batter against India in T20Is. The match produced an aggregate of 458 runs across 40 overs, a nightmare scenario for any bowling attack. India fought back with 201 in reply but fell well short, closing out a series that ended exactly as it began — with England in complete control.',
            teams: { team1: 'England', team1Score: '257/3', team2: 'India', team2Score: '201' }
        }
    ],

    performances: [
        {
            playerName: 'Jos Butler',
            title: 'Jos Butler\'s Historical Achievement',
            excerpt: '131 off 64 balls — the highest individual score recorded against India in T20I history.',
            stats: { score: '131*', balls: '64', role: 'Batsman' },
            content: 'Butler\'s masterclass display in the fifth T20I showcased aggressive intent balanced with genuine technical excellence — clearing the ropes at will while still finding the gaps for quick singles when the boundary wasn\'t on. It was an innings that redefined what a par score looks like in this fixture.'
        },
        {
            playerName: 'Harry Brook',
            title: 'Harry Brook\'s Consistent Excellence',
            excerpt: 'Multiple influential innings including 95 off 45 deliveries demonstrated tactical brilliance across formats.',
            stats: { score: '95*', balls: '45', role: 'Batsman' },
            content: 'Brook\'s performances across the series — most notably his unbeaten 95 in the finale — established him as England\'s most consistent threat, mixing calculated aggression with the ability to accelerate at will once set.'
        },
        {
            playerName: 'Jofra Archer',
            title: 'Jofra Archer\'s Pace Mastery',
            excerpt: 'Express pace generated consistent breakthroughs with figures of 3-29 in the decisive third T20I.',
            stats: { score: '3', balls: '29', role: 'Bowler' },
            content: 'Archer\'s relentless pace and steep bounce proved devastating for an inexperienced Indian top order, repeatedly targeting the top of off stump and forcing hurried strokes that led directly to India\'s series-low total.'
        },
        {
            playerName: 'Shreyas Iyer',
            title: 'Shreyas Iyer\'s Captaincy Resilience',
            excerpt: 'An unbeaten 80 in the fourth T20I showcased the new captain\'s personal quality under pressure.',
            stats: { score: '80*', balls: '45', role: 'Captain/Batsman' },
            content: 'Despite the series loss, Iyer\'s innings in the fourth match showed genuine fighting spirit and class, carrying the innings almost single-handedly while wickets fell steadily around him.'
        },
        {
            playerName: 'Josh Tongue',
            title: 'Josh Tongue\'s Bowling Impact',
            excerpt: 'Figures of 4-28 in the third T20I demonstrated disciplined seam bowling at pace.',
            stats: { score: '4', balls: '28', role: 'Bowler' },
            content: 'Tongue\'s accuracy and hostile short-ball plan made him instrumental in England\'s bowling success, complementing Archer perfectly by attacking from the other end with equal intensity.'
        },
        {
            playerName: 'Butler-Brook',
            title: 'Butler-Brook Partnership Record',
            excerpt: 'A 233-run partnership established England\'s highest partnership in T20I cricket history.',
            stats: { score: '233', balls: '150', role: 'Partnership' },
            content: 'This record-breaking stand in the fifth T20I fundamentally reshaped the tournament\'s scoring benchmarks and will likely stand as a series highlight for years to come.'
        },
        {
            playerName: 'Jacob Bethell',
            title: 'Jacob Bethell\'s Calm Assurance',
            excerpt: '76 from 46 balls in the second T20I showed maturity beyond his experience level.',
            stats: { score: '76', balls: '46', role: 'Batsman' },
            content: 'Bethell\'s knock combined watchful starts with calculated acceleration, anchoring the chase while others played around him — a sign of a player growing into a genuine white-ball finisher.'
        },
        {
            playerName: 'Phil Salt',
            title: 'Phil Salt\'s Anchor Role',
            excerpt: '70 in the third T20I after a slow start laid the platform for England\'s 201.',
            stats: { score: '70', balls: '52', role: 'Batsman' },
            content: 'Salt\'s innings was a study in adaptation — starting cautiously against early swing before opening up in the back half of the innings to give England a defendable total.'
        }
    ],

    analysis: [
        {
            title: 'Batting Collapse Analysis',
            excerpt: 'India\'s inexperienced middle order consistently faltered against express pace and short-pitched bowling.',
            content: 'The inability to handle steep bounce and hostile pace revealed critical weaknesses in technical preparation, particularly against deliveries targeting the ribcage and above. This pattern repeated across multiple matches, suggesting a structural rather than one-off issue.',
            category: 'Analysis'
        },
        {
            title: 'England\'s Strategic Mastery',
            excerpt: 'Tactical precision in bowling strategy coupled with aggressive batting intent defined the series.',
            content: 'England\'s operational superiority was evident throughout — from field placements that choked scoring options to a batting order built around fearless intent from ball one. The management\'s willingness to back players through failures paid dividends.',
            category: 'Analysis'
        },
        {
            title: 'Youth Development Paradox',
            excerpt: 'While debutant integration provides long-term opportunities, the immediate performance cost was steep.',
            content: 'India fielded several uncapped players in unfamiliar conditions, a decision with clear long-term development value but which left the side short of the experience needed to compete match-to-match against a battle-hardened opponent.',
            category: 'Analysis'
        },
        {
            title: 'Seven-Match Winless Streak',
            excerpt: 'India\'s unprecedented consecutive losses in T20I cricket underscore systemic challenges.',
            content: 'This is India\'s longest winless run in the format in recent memory, and it demands introspection at the selection and preparation level heading into the T20 World Cup cycle.',
            category: 'Analysis'
        },
        {
            title: 'Pace Bowling Vulnerability',
            excerpt: 'India\'s susceptibility to express pace, particularly short-pitched deliveries, emerged as a fundamental weakness.',
            content: 'Across all five matches, India\'s top order struggled specifically against deliveries above 145 km/h, a trend that opposition analysts will now target relentlessly in future series.',
            category: 'Analysis'
        },
        {
            title: 'Path to Redemption',
            excerpt: 'The return of experienced international players in the ODI series offers an immediate opportunity to rebuild confidence.',
            content: 'With senior players back in the fold for the 50-over series, India has a near-immediate chance to address the technical and psychological scars left by this T20I whitewash.',
            category: 'Analysis'
        },
        {
            title: 'Powerplay Discipline Gap',
            excerpt: 'England\'s powerplay execution consistently outclassed India\'s across the series.',
            content: 'England averaged a significantly higher powerplay run rate while losing fewer wickets inside the first six overs — a discipline gap that compounded across every match and set the tone for the innings that followed.',
            category: 'Analysis'
        }
    ]
};

const odiData = {
    seriesInfo: {
        name: 'India vs England ODI Series 2026',
        status: 'ongoing',
        result: 'Series Level 1-1',
        totalMatches: 3,
        completedMatches: 2,
        startDate: new Date('2026-07-14'),
        endDate: null
    },

    featuredArticle: {
        title: 'Root Anchors England to Level Series Against India',
        subtitle: 'Masterclass display of controlled batting guides successful chase at Cardiff',
        content: 'In a masterclass display of controlled batting, Joe Root\'s unbeaten 99 guided England to chase down India\'s 233-run total and level the ODI series 1-1 at Cardiff. England\'s bowlers, led by Jofra Archer and Gus Atkinson, orchestrated a devastating middle-order collapse that turned a competitive Indian total into a below-par one. This win sets up a mouth-watering series decider at Lord\'s, a venue steeped in cricketing history that has rarely favoured chasing sides.',
        badge: 'ODI Series',
        date: new Date('2026-07-16'),
        author: 'Cricket Correspondent'
    },

    statistics: [
        { label: 'India Total', value: '233/8', description: '2nd ODI at Cardiff' },
        { label: 'Joe Root', value: '99*', description: 'Man of the Match, 133 balls' },
        { label: 'Archer Figures', value: '3-47', description: 'Best Bowling' },
        { label: 'Series Status', value: '1-1', description: 'Level heading to Lord\'s' }
    ],

    matches: [
        {
            matchNumber: 1,
            title: '1st ODI at Manchester: India Draws First Blood',
            excerpt: 'India secured a commanding 50-run victory in the series opener with clinical batting and bowling.',
            category: 'Match Report',
            venue: 'Old Trafford, Manchester',
            date: new Date('2026-07-14'),
            result: 'India won by 50 runs',
            content: 'India posted a commanding 285 for seven, built on a fluent century stand and late fireworks from the lower order. Virat Kohli anchored the innings with a composed knock while support from Shreyas Iyer and Axar Patel pushed the total well beyond par. In reply, England never found the rhythm required to chase such a target — early wickets from India\'s new-ball pair put them on the back foot, and despite a fighting effort from the middle order, they fell 50 runs short with two overs unused. Kohli\'s all-round influence, including a sharp run-out, earned him the Player of the Match award.',
            teams: { team1: 'India', team1Score: '285/7', team2: 'England', team2Score: '235 (47.2 ov)' },
            playerOfMatch: 'Virat Kohli'
        },
        {
            matchNumber: 2,
            title: '2nd ODI at Cardiff: Root\'s Masterclass Levels the Series',
            excerpt: 'Joe Root\'s unbeaten 99 from 133 balls guides England\'s successful chase of 234 with 35 balls to spare.',
            category: 'Match Report',
            venue: 'Sophia Gardens, Cardiff',
            date: new Date('2026-07-16'),
            result: 'England won by 6 wickets',
            content: 'India\'s openers, Shubman Gill and Virat Kohli, gave the visitors a strong platform with a 61-run powerplay stand. Kohli completed his 78th ODI half-century in trademark fashion before Jofra Archer struck twice in quick succession to swing momentum decisively. From 177/3 in 31 overs, India slumped to 210/8, losing five wickets for just 33 runs in ten overs, with Gus Atkinson (3-50) also among the wickets. In the chase, England lost three early wickets — including Bumrah removing Ben Duckett with the very first ball of the innings — but Joe Root\'s unbeaten 99 from 133 balls, anchoring a string of crucial partnerships including a match-defining 72 with Will Jacks, steered England home with six wickets and 35 balls in hand.',
            teams: { team1: 'India', team1Score: '233/8', team2: 'England', team2Score: '234/4 (48.1 ov)' },
            playerOfMatch: 'Joe Root'
        }
    ],

    performances: [
        {
            playerName: 'Joe Root',
            title: 'Joe Root\'s Masterclass Display',
            excerpt: '99* from 133 balls showcasing controlled batting, textbook technique, and composure under pressure — Player of the Match.',
            stats: { score: '99*', balls: '133', role: 'Batsman' },
            content: 'Root batted from the second over of the chase right through to the winning moment, adjusting his tempo through each partnership without ever looking rushed. His innings was less about boundary hitting and more about complete control — playing the ball late, rotating strike relentlessly, and never allowing the required rate to escalate.'
        },
        {
            playerName: 'Virat Kohli',
            title: 'Virat Kohli\'s 78th Half-Century',
            excerpt: 'Extravagant cover drives, calculated singles, and innovative sweeps against Adil Rashid highlighted his class.',
            stats: { score: '67', balls: '72', role: 'Batsman' },
            content: 'Kohli\'s half-century in Cardiff was vintage — a mix of trademark cover drives and smart manipulation of the field against spin, before falling to a well-set-up dismissal from Jofra Archer that broke a well-constructed partnership.'
        },
        {
            playerName: 'Jofra Archer',
            title: 'Jofra Archer\'s Match-Winning Spell',
            excerpt: '10-0-47-3 figures including the crucial dismissal of Virat Kohli that turned the match.',
            stats: { score: '3', balls: '47', role: 'Bowler' },
            content: 'Archer\'s sixth-over breakthrough dismissing Kohli, followed by a double-strike removing Axar Patel and Shivam Dube in successive balls, was the decisive passage of play that swung the match firmly England\'s way.'
        },
        {
            playerName: 'Gus Atkinson',
            title: 'Gus Atkinson\'s Penetrative Bowling',
            excerpt: '9-1-50-3 figures with an early dismissal of Shubman Gill and crucial late breakthroughs.',
            stats: { score: '3', balls: '50', role: 'Bowler' },
            content: 'Atkinson\'s ability to strike at both ends of the innings — removing Gill in the powerplay and returning to clean up the tail — made him instrumental in restricting India below what looked a certain 260-plus total at the halfway stage.'
        },
        {
            playerName: 'Will Jacks',
            title: 'Will Jacks\' Crucial Partnership',
            excerpt: 'A gritty 72-run partnership with Root lasting 86 balls all but sealed England\'s chase.',
            stats: { score: '72', balls: '86', role: 'Batsman' },
            content: 'Jacks provided the stabilizing presence England needed after a mid-innings wobble, absorbing pressure while Root rotated strike, before a late flourish accelerated the chase into its final stages.'
        },
        {
            playerName: 'Shreyas Iyer',
            title: 'Shreyas Iyer\'s Resilient Fifty',
            excerpt: 'An unbeaten half-century provided the sole resistance against England\'s relentless bowling attack in Cardiff.',
            stats: { score: '50*', balls: '58', role: 'Batsman' },
            content: 'Iyer\'s fighting innings, carved out amid a collapsing middle order, was the difference between a defendable total and a truly modest one, though it ultimately wasn\'t enough against Root\'s composure.'
        },
        {
            playerName: 'Jasprit Bumrah',
            title: 'Bumrah\'s Lightning Start',
            excerpt: 'A first-ball wicket of Ben Duckett set the tone for a probing opening spell in the Cardiff chase.',
            stats: { score: '1', balls: '10', role: 'Bowler' },
            content: 'Bumrah\'s trademark discipline and pace off the very first delivery gave India the perfect start, though the middle overs lacked the same incisiveness as England\'s recovery took hold.'
        }
    ],

    previews: [
        {
            title: 'Series Decider at Lord\'s',
            excerpt: 'The venue traditionally favours batting first — no successful chase in a men\'s ODI since the tied 2019 World Cup final.',
            content: 'With the series level at 1-1, India and England head to the home of cricket for a decisive third ODI. Five ODIs have been played at Lord\'s since that famous final, and all five were won by the team batting first — a statistic that will weigh heavily on the toss.',
            category: 'Preview',
            matchNumber: 3
        },
        {
            title: 'India\'s Selection Challenges',
            excerpt: 'Washington Sundar\'s hamstring injury forces a Kuldeep Yadav inclusion, thinning the batting order.',
            content: 'Bringing in Kuldeep as an attacking spin option addresses a phase where India struggled to take wickets in the middle overs, but it leaves the tail starting from No.8 — a balance India have been reluctant to risk in recent seasons.',
            category: 'Preview',
            matchNumber: 3
        },
        {
            title: 'The Kohli-Archer Duel',
            excerpt: 'Jofra Archer has dismissed Virat Kohli in back-to-back games — the standout individual battle of the series.',
            content: 'Kohli has historically answered tough questions from fast bowlers with authority, and a big score at Lord\'s would be the perfect riposte to Archer\'s early dominance in this head-to-head.',
            category: 'Preview',
            matchNumber: 3
        },
        {
            title: 'Root vs Bumrah Contest',
            excerpt: 'Joe Root remains unbeaten and the series\' leading run-scorer heading into the decider.',
            content: 'Bumrah\'s ability to strike early against England\'s top order will be central to India\'s hopes of containing Root before he can settle into his now-familiar rhythm.',
            category: 'Preview',
            matchNumber: 3
        },
        {
            title: 'England\'s Momentum',
            excerpt: 'Back-to-back strong performances and Root\'s consistency give England the psychological edge.',
            content: 'England are likely to field an unchanged XI barring injury, trusting the same combination that engineered the Cardiff turnaround.',
            category: 'Preview',
            matchNumber: 3
        },
        {
            title: 'Competitive Bilateral Series',
            excerpt: 'Unlike the one-sided T20I series, this ODI contest has delivered tightly fought, high-quality cricket.',
            content: 'Both games so far have swung on key passages of play rather than one-sided dominance, setting up a series decider that promises to be a fitting climax.',
            category: 'Preview',
            matchNumber: 3
        }
    ],

    keyContests: [
        {
            title: 'The Kohli-Archer Duel',
            players: ['Virat Kohli', 'Jofra Archer'],
            description: 'Archer has dismissed Kohli in back-to-back games. Kohli has always answered tough questions from bowlers before — watch for the response at Lord\'s.'
        },
        {
            title: 'Root vs Bumrah',
            players: ['Joe Root', 'Jasprit Bumrah'],
            description: 'Root remains unbeaten and is the series\' leading run-getter. Bumrah\'s early incisiveness will be critical for India\'s hopes.'
        }
    ]
};

async function seedDatabase() {
    try {
        await T20I.deleteMany({});
        await ODI.deleteMany({});

        await T20I.create(t20iData);
        await ODI.create(odiData);
        console.log('✓ T20I Data seeded successfully');
        console.log('✓ ODI Data seeded successfully');
        console.log('\nDatabase populated with cricket coverage.');

        await notifyLiveClients();

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Best-effort: if the API server happens to be running, tell it to push a
// live update to every connected browser so open tabs refresh their
// coverage automatically. If the server isn't running, this just silently
// does nothing - seeding itself still succeeded either way.
function notifyLiveClients() {
    return new Promise((resolve) => {
        const http = require('http');
        const port = process.env.PORT || 5000;
        const req = http.request(
            { hostname: 'localhost', port, path: '/api/series/broadcast-update', method: 'POST', timeout: 1500 },
            () => { console.log('✓ Notified live clients of the update'); resolve(); }
        );
        req.on('error', () => resolve()); // server not running - that's fine
        req.on('timeout', () => { req.destroy(); resolve(); });
        req.end();
    });
}

seedDatabase();
