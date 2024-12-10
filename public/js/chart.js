document.addEventListener('DOMContentLoaded', function () {
    async function fetchCount() {
         try {
            var percentages = {};
             const response = await fetch('/count');
             const data = await response.json();
             console.log(data);
            const getVl = [
                data[0].GetMentCriteria.length,
                data[0].GetFitCriteria.length,
                data[0].GetNutCriteria.length,
                data[0].GetMindCriteria.length,
                data[0].GetSelfCriteria.length,
                data[0].GetAllCriteria.length,
                data[1].GetMentCriteriaTwo.length,
                data[1].GetFitCriteriaTwo.length,
                data[1].GetNutCriteriaTwo.length,
                data[1].GetMindCriteriaTwo.length,
                data[1].GetSelfCriteriaTwo.length,
                data[1].GetAllCriteriaTwo.length,
                data[2].GetMentCriteriathreeTwo.length,
                data[2].GetFitCriteriathreeTwo.length,
                data[2].GetNutCriteriathreeTwo.length,
                data[2].GetMindCriteriathreeTwo.length,
                data[2].GetSelfCriteriathreeTwo.length,
                data[2].GetAllCriteriathreeTwo.length,
                data[3].GetMentCriteriasevenTwo.length,
                data[3].GetFitCriteriasevenTwo.length,
                data[3].GetNutCriteriasevenTwo.length,
                data[3].GetMindCriteriasevenTwo.length,
                data[3].GetSelfCriteriasevenTwo.length,
                data[3].GetAllCriteriasevenTwo.length
            ];
            const rows = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'];
            let valueGet = 0;
            function updateCell(){
                for(let tdindex = 0; tdindex < 4; tdindex++){
                    rows.forEach((rowId)=>{
                        const row = document.querySelector(`#${rowId}`);
                        if(row){
                            const cell = row.cells[tdindex + 1];
                            if(cell && valueGet < getVl.length){
                                cell.textContent = getVl[valueGet];
                                //let tt =+ getVl[valueGet];
                                // getValue(tt);
                                valueGet++
                            }
                        }
                    });
                    if(valueGet >= getVl.length){
                        break;
                    }
                }
               const totalNumber = getVl.reduce((sum, count) => sum + count, 0);
               rows.forEach( rows =>{
                const row = document.querySelector(`#${rows}`);
                if(row){
                    let sum = 0;
                    for(let i = 1; i < row.cells.length-1; i++){
                        const cell = row.cells[i];
                        if(cell){
                            const valueGet = parseFloat(cell.textContent);
                            if(!isNaN(valueGet)){
                                sum += valueGet;
                            }

                        }
                    }
                    const lastTd = row.cells[row.cells.length - 1];
                    if(lastTd){
                        lastTd.textContent = sum;
                        const percentage = ((sum / totalNumber) * 100).toFixed(1);
                        percentages[rows] = parseFloat(percentage);
                        // console.log(percentage);
                    //     lastTd.textContent = percentage + '%';
                    }
                }
               });
               drawChart();
            }
            function drawChart() {
              var data = google.visualization.arrayToDataTable([
                ['Task', 'Percentage'],
                ['Mental Health', percentages['row1'] || 0],
                ['Physical Fitness', percentages['row2'] || 0],
                ['Nutrition', percentages['row3'] || 0],
                ['Mindfulness', percentages['row4'] || 0],
                ['Self-Care', percentages['row5'] || 0],
                ['All of the Above', percentages['row6'] || 0]
              ]);
      
              var options = {
                title: 'Daily Activities',
                'width':600,
                'height':600,
                sliceVisibilityThreshold: 0,
                pieSliceText: 'both',
                //pieSliceText: 'label', // Ensure labels are shown
                //legend: { position: 'labeled' }, // Display labels in the legend
                is3D: true,
              };
      
              var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
              chart.draw(data, options);
            }
            google.charts.load("current", {packages:["corechart"]});
            google.charts.setOnLoadCallback(updateCell);
     
            } catch (error) {
             console.error('Error fetching count:', error);
             return 0;
         } 
}
fetchCount();
});
