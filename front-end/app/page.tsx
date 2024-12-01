'use client'

import { useEffect } from 'react'
import Header from '@/components/header/student'
import useMyAttempts from '@/actions/attempt/get-my-attempts'

export default function Index() {
  const { isLoading, error, attempts, fetchAttemts } = useMyAttempts()

  useEffect(() => {
    fetchAttemts()
  }, [])

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-5 pt-5">
        <Header />

        <h1 className='font-medium text-xl mb-5 max-w-lg w-full mx-auto'>Тарих:</h1>

        {isLoading ? (
          <p>Жүктелуде...</p>
        ) : error ? (
        <p className="text-red-500">Қате: {error}</p>
        ) : (
        <div className="space-y-4 max-w-lg mx-auto">
          {attempts.length > 0 ? (
            attempts.map((attempt, index) => {
              const { quiz, score, createdAt } = attempt
              const totalQuestions = quiz?.questions?.length || 0
              const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0

              return (
                <div key={index} className="border-pink-500 border shadow-md rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{quiz?.title}</h3>
                  <p className="text-sm text-gray-500">{quiz?.description}</p>
                  <p className="mt-2">
                    <strong>Ұпай:</strong> {score}/{totalQuestions} ({percentage.toFixed(2)}%)
                  </p>
                  <p className="text-sm text-gray-400">
                    Өткізілген күні: {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
              )
            })
          ) : (
            <p>Сіз әлі ешқандай тесттен өтпегенсіз.</p>
            )}
        </div>
        )}
      </div>
    </div>
  )
}
