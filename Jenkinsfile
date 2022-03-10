//      stage('Building Image'){  
//             steps{    
//                 script {
//                     dockerImage = docker.build registry
// }
// }

//     }
//        stage('Upload Image') {
// steps{    
//          script {
//             docker.withRegistry( '', registryCredential ) {
//             dockerImage.push()
//             }
//         }
//       }
//   }
    // }
        // Stopping Docker containers for cleaner Docker run
    //  stage('docker stop container') {
    //      steps {
    //         sh 'docker ps -f name=mypythonappContainer -q | xargs --no-run-if-empty docker container stop'
    //         sh 'docker container ls -a -fname=mypythonappContainer -q | xargs -r docker container rm'
    //      }
    //    }
// }

pipeline {
  agent any
 
  tools {nodejs "node"}
 
  stages {
              stage('Cloning Git'){
            steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/test']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/prosaox/StudyBuddy.git']]])
            }
        } 
        stage('Start')
        {
            steps{
                script {
                    sh 'cd Backend'
                    sh 'npm --version'
                    sh 'npm install'
                    sh 'npm install -g nodemon jest supertest express bcryptjs jsonwebtoken mongoose express-validator'
                }
            }
        }
        stage('Build')
        {
                steps{
                dir('Backend') {
                    sh 'chmod 777 ./node_modules/.bin/nodemon'
                    sh 'yarn add nodemon -D'
                    sh 'npm start'
                }
            }
        }
        // stage('Test')
        // {
        //     steps{
        //         script {
        //         sh "pwd"
        //         // sh "chmod +x -R StudyBuddy\ Docker"
        //         dir('Backend') {
        //             sh "chmod +x -R 'StudyBuddy Docker'"
        //             sh 'npm run test'
        //         }
        //         sh "pwd"
        //         }
        //     }
        // }
    stage('Example') {
      steps {
        sh 'npm config ls'
      }
      
    }
  }
}