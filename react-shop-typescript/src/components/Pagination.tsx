import React, { AllHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { changeQueryURL, convertQueryURLToObject } from 'utils/url'
import { useHistory } from 'react-router-dom'

interface PaginateProp {
  currentPage: number
  totalPage: number
}

export const Pagination: React.FC<PaginateProp> = ({ currentPage, totalPage }) => {

  let objectURL = convertQueryURLToObject()

  const renderPage = () => {
    let start = currentPage - 2,
      end = currentPage + 2


    if (start < 1) {
      start = 1
    }

    if (end > totalPage) {
      end = totalPage
    }

    if ((end - start) < 4) {
      if (start === 1) {
        if (currentPage === 2) {
          end += (currentPage - 1)
        } else {
          end += (currentPage + start)
        }

      }

      if (end === totalPage) {
        start = totalPage - 4
      }
      if (totalPage < 5) {
        end = totalPage
        start = 1
      }
    }
    let list = []
    for (let i = start; i <= end; i++) {
      list.push(
        <li className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <Link className="page-link" to={changeQueryURL({ ...objectURL, page: i })}>{i}</Link>
        </li>
      )
    }
    return list
  }

  if(totalPage <= 1) return null
  return (
    <nav className="d-flex justify-content-center justify-content-md-end">
      <ul className="pagination pagination-sm text-gray-400">
        {
          (currentPage > 1 && (
            <li className="page-item">
              <Link className="page-link page-link-arrow" to={changeQueryURL({ ...objectURL, page: currentPage - 1 })}>
                <i className="fa fa-caret-left" />
              </Link>
            </li>
          ))
        }

        {renderPage()}

        {
          currentPage < totalPage && (
            <li className="page-item">
              <Link className="page-link page-link-arrow" to={changeQueryURL({ ...objectURL, page: currentPage + 1 })}>
                <i className="fa fa-caret-right" />
              </Link>
            </li>
          )
        }

      </ul>
    </nav>
  )
}


