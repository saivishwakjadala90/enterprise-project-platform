import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [
    "#1976d2",
    "#2e7d32",
    "#ed6c02",
    "#d32f2f",
    "#7b1fa2"
];

function ProjectStatusChart({ data }) {

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <PieChart>

                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    outerRadius={120}
                    label
                >

                    {

                        data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))

                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}

export default ProjectStatusChart;