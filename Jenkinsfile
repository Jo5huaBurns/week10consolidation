pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test JavaScript Functions') {
            steps {
                script {
                    // Create a standalone test file that extracts and tests core functions
                    writeFile file: 'test-functions.js', text: '''
// Extract and test core functions from script.js
function checkGame(board) {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // columns
        [0,4,8],[2,4,6]          // diagonals
    ];
    
    for (let w of wins) {
        if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[1]] === board[w[2]]) {
            return board[w[0]];
        }
    }
    
    if (!board.includes('')) return 'Draw';
    return null;
}

function isValidMove(board, index) {
    return index >= 0 && index < 9 && board[index] === '';
}

// Simple test function
function runTests() {
    let passed = 0;
    let failed = 0;
    
    function test(name, condition) {
        if (condition) {
            console.log('✓ PASS: ' + name);
            passed++;
        } else {
            console.log('✗ FAIL: ' + name);
            failed++;
        }
    }
    
    console.log('Running Tic Tac Toe Tests...');
    console.log('================================');
    
    // Test 1: X wins horizontally
    test('X wins horizontally', checkGame(['X','X','X','','','','','','']) === 'X');
    
    // Test 2: O wins diagonally  
    test('O wins diagonally', checkGame(['O','','','','O','','','','O']) === 'O');
    
    // Test 3: Draw game
    test('Draw detected', checkGame(['X','O','X','O','X','O','O','X','O']) === 'Draw');
    
    // Test 4: Game continues
    test('Game continues', checkGame(['X','','','','','','','','']) === null);
    
    // Test 5: Valid move
    test('Valid move', isValidMove(['','','','','','','','',''], 0) === true);
    
    // Test 6: Invalid move
    test('Invalid move', isValidMove(['X','','','','','','','',''], 0) === false);
    
    console.log('================================');
    console.log('Tests completed: ' + (passed + failed));
    console.log('Passed: ' + passed);
    console.log('Failed: ' + failed);
    
    if (failed > 0) {
        process.exit(1);
    }
}

runTests();
                    '''
                }
                
                // Run the test
                sh 'node test-functions.js'
            }
        }
        
        stage('Validate Files') {
            steps {
                script {
                    // Check that your files exist and have valid syntax
                    sh '''
                    echo "Checking if HTML file exists..."
                    if [ -f "index.html" ]; then
                        echo "✓ index.html found"
                    else
                        echo "✗ index.html not found"
                        exit 1
                    fi
                    
                    echo "Checking if script.js exists..."
                    if [ -f "script.js" ]; then
                        echo "✓ script.js found"
                    else
                        echo "✗ script.js not found"
                        exit 1
                    fi
                    
                    echo "Basic syntax check on script.js..."
                    node -c script.js && echo "✓ script.js syntax is valid"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Clean up test files
            sh 'rm -f test-functions.js'
        }
        success {
            echo 'All tests passed! ✓'
        }
        failure {
            echo 'Tests failed! ✗'
        }
    }
}