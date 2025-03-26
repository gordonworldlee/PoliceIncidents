import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {capitalize, getScoreColor} from '@/components/DepartmentCard'
import {DepartmentCard} from '@/components/DepartmentCard'
import {Department} from '@/public/data/DepartmentData';
import { TeamMember} from '@/app/components/TeamMemberCard'
import TeamMemberCard from '@/app/components/TeamMemberCard';
import { GitLabStats } from "@/app/utils/gitlab";


jest.mock('lucide-react', () => ({
    MapPin: () => <div data-testid="map-pin-icon" />,
    Building2: () => <div data-testid="building-icon" />,
    Shield: () => <div data-testid="shield-icon" />,
    BarChart2: () => <div data-testid="bar-chart-icon" />,
    Target: () => <div data-testid="target-icon" />,
    AlertTriangle: () => <div data-testid="alert-icon" />
  }));

describe('capitalize', () => {
    test('capitalizes the first letter of a string', () => {
        const text = 'hello world'
        const capitalized = capitalize(text, ' ')
        expect(capitalized).toBe('Hello World')
    })

    test('capitalizes the first letter of a string with dash delimiter', () => {
        const text = 'police-department'
        const capitalized = capitalize(text, '-');
        expect(capitalized).toBe('Police Department');
    })
})

describe('getScoreColor', () => {
    test('returns the correct color for a score', () => {
        const score = 50;
        const color = getScoreColor(score).icon;
        expect(color).toBe('orange');
    })

    test('returns the correct color for a score', () => {
        const score = 20;
        const color = getScoreColor(score).icon;
        expect(color).toBe('red');
    })

    test('returns the correct color for a score', () => {
        const score = 80;
        const color = getScoreColor(score).icon;
        expect(color).toBe('green');
    })
})

const mockGitLabStats: GitLabStats = {
    commits: 100,
    openIssues: 50,
    closedIssues: 25
}

const mockDepartment: Department = {
    "agency_name": "DALLAS",
    "agency_type": "police-department",
    "calc_overall_score": "46%",
    "calc_police_accountability_score": "49%",
    "calc_police_funding_score": "38%",
    "calc_police_violence_score": "48%",
    "civilian_complaints_reported": "3572.0",
    "criminal_complaints_reported": "14.0",
    "id": 7,
    "latitude": "32.76778",
    "location_name": "DALLAS",
    "longitude": "-96.79468",
    "ori_identifier": "TXDPD0000",
    "police_shootings_2013": "22.0",
    "police_shootings_2014": "20.0",
    "police_shootings_2015": "11.0",
    "police_shootings_2016": "13.0",
    "police_shootings_2017": "7.0",
    "police_shootings_2018": "4.0",
    "police_shootings_2019": "11.0",
    "police_shootings_2020": "5.0",
    "police_shootings_2021": "1.0",
    "state": "TX",
    "total_population": "1278608",
    "use_of_force_complaints_reported": "268.0",
    "incident_id" : "incident2"
};

const mockTeamMember: TeamMember = {
    name: 'John Doe',
    username: 'johndoe',
    role: 'Developer',
    bio: 'John Doe is a developer at JusticeWatch',
    photoUrl: 'https://via.placeholder.com/150',
    gitlabUrl: 'https://gitlab.com/johndoe',
    stats: mockGitLabStats
};

describe('DepartmentCard', () => {
    test('renders department card correctly', () => {
        render(<DepartmentCard {...mockDepartment} />);
        expect(screen.getByText('Dallas Police Department')).toBeInTheDocument();
        expect(screen.getByText('Dallas, TX')).toBeInTheDocument();
        expect(screen.getByText('46')).toBeInTheDocument();
        expect(screen.getByText('48')).toBeInTheDocument();
    })

    test('check boxes in card', () => {
        render(<DepartmentCard {...mockDepartment} />);
        const policeViolenceBox = screen.getByText('Police Shooting').closest('div');
        expect(policeViolenceBox).toHaveClass('bg-green-100');
    })

    test('check boxes in card', () => {
        render(<DepartmentCard {...mockDepartment} />);
        const policeViolenceBox = screen.getByText('Police Violence').closest('div');
        expect(policeViolenceBox).toHaveClass('bg-orange-100');
    })
})

describe('TeamMemberCard', () => {
    test('renders team member card correctly', () => {
        render(<TeamMemberCard member={mockTeamMember} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Developer')).toBeInTheDocument();
    })

    test('renders team member card correctly', () => {
        render(<TeamMemberCard member={mockTeamMember} />);
        expect(screen.getByText('John Doe is a developer at JusticeWatch')).toBeInTheDocument();
    })
});

