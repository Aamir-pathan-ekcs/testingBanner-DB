document.addEventListener('DOMContentLoaded', function () {
    async function fetchCount() {
         try {
            var percentages = {};
             const response = await fetch('/count');
             const data = await response.json();
            // console.log(data);
            const getVl = [
                data.mentalHealth.sixNotedCount.length,
                data.physicalFitness.sixNotedCount.length,
                data.nutrition.sixNotedCount.length,
                data.mindfulness.sixNotedCount.length,
                data.selfCare.sixNotedCount.length,
                data.allOfTheAbove.sixNotedCount.length,
                data.mentalHealth.twoNotedCount.length,
                data.physicalFitness.twoNotedCount.length,
                data.nutrition.twoNotedCount.length,
                data.mindfulness.twoNotedCount.length,
                data.selfCare.twoNotedCount.length,
                data.allOfTheAbove.twoNotedCount.length,
                data.mentalHealth.threeNotedCount.length,
                data.physicalFitness.threeNotedCount.length,
                data.nutrition.threeNotedCount.length,
                data.mindfulness.threeNotedCount.length,
                data.selfCare.threeNotedCount.length,
                data.allOfTheAbove.threeNotedCount.length,
                data.mentalHealth.sevenNotedCount.length,
                data.physicalFitness.sevenNotedCount.length,
                data.nutrition.sevenNotedCount.length,
                data.mindfulness.sevenNotedCount.length,
                data.selfCare.sevenNotedCount.length,
                data.allOfTheAbove.sevenNotedCount.length
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