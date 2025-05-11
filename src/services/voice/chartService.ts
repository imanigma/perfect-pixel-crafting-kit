
import { toast } from "@/components/ui/sonner";

/**
 * Service to handle chart generation
 */
export const chartService = {
  // Get chart data based on topic
  async getChartData(topic: string): Promise<string> {
    try {
      // In a real implementation:
      // const formData = new FormData();
      // formData.append('topic', topic);
      // const response = await axios.post('/api/plot', formData);
      // return response.data.response;
      
      // Mock implementation
      const chartScripts = [
        `
        const data = [
          { month: 'Jan', value: 1000 },
          { month: 'Feb', value: 1200 },
          { month: 'Mar', value: 900 },
          { month: 'Apr', value: 1500 },
          { month: 'May', value: 1800 },
          { month: 'Jun', value: 2000 }
        ];
        
        // Use Recharts to create a line chart
        return (
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#2751B9" />
          </LineChart>
        );
        `,
        `
        const data = [
          { name: 'AAPL', value: 35 },
          { name: 'MSFT', value: 25 },
          { name: 'AMZN', value: 20 },
          { name: 'GOOGL', value: 15 },
          { name: 'META', value: 5 }
        ];
        
        // Use Recharts to create a pie chart
        return (
          <PieChart width={500} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#2751B9"
              dataKey="value"
              label={function(entry) { return entry.name + " " + Math.floor(entry.percent * 100) + "%"; }}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={['#2751B9', '#3962c8', '#6089db', '#87a7e7', '#afc5f0'][index % 5]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
        `
      ];
      
      return chartScripts[Math.floor(Math.random() * chartScripts.length)];
    } catch (error) {
      console.error('Error getting chart data:', error);
      toast.error('Error generating chart. Please try again.');
      throw error;
    }
  }
};
