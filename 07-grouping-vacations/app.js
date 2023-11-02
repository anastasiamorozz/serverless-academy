import fs from 'fs';

function run(){
    console.log('Getting data from file...');
    const data = fs.readFileSync('data.json');
    if(data){
        console.log(`Data received successfully!`);
    }
    const reduce = JSON.parse(data).reduce((accumulator, currentValue) => {
        let push = false;
    
        if (accumulator.length==0) {
            accumulator.push({ userId: currentValue.user._id,
                 userName: currentValue.user.name,
                  vacations: [ { startDate: currentValue.startDate, endDate: currentValue.endDate } ] });
        } else {
            for (const element of accumulator) {
                if (currentValue.user.name === element.userName) {
                    element.vacations.push({ startDate: currentValue.startDate, endDate: currentValue.endDate });
                    push = true;
                }
            }
    
            if (!push) {
                accumulator.push({ userId: currentValue.user._id,
                     userName: currentValue.user.name,
                      vacations: [ { startDate: currentValue.startDate,
                        endDate: currentValue.endDate } ] });
            }
        }
    
        return accumulator;
    }, []);

    console.log('Here is an improved view of objects: ')
    console.log(reduce);
}

run()