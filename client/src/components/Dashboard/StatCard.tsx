import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatCardProps {
    title: string
    value: string
    icon: React.ReactNode
  }

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => {
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                </CardContent>
            </Card>
        </>
    );
}

export default StatCard;
