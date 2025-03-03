import React, { Component } from 'react'
import male from '../../assets/maleimage.png'
import female from '../../assets/femaleimage.png'

export default class Crud extends Component {
	constructor() {
		super()
		this.state = {
			fname: '',
			lname: '',
			birthdate: '',
			gender: 'male',
			hobby: '',
			users: [],
			editingId: null,
		}
	}

	handleSubmit = e => {
		e.preventDefault()
		const { fname, lname, birthdate, gender, hobby, users, editingId } =
			this.state

		if (editingId) {
			this.setState({
				users: users.map(user =>
					user.id === editingId
						? { ...user, fname, lname, birthdate, gender, hobby }
						: user
				),
				editingId: null,
			})
		} else {
			let newUser = {
				id: Date.now(),
				fname,
				lname,
				birthdate,
				gender,
				hobby,
			}
			this.setState({ users: [...users, newUser] })
		}

		this.setState({
			fname: '',
			lname: '',
			birthdate: '',
			gender: 'male',
			hobby: '',
		})
	}

	handleDelete = id => {
		this.setState({ users: this.state.users.filter(user => user.id !== id) })
	}

	handleEdit = user => {
		this.setState({
			fname: user.fname,
			lname: user.lname,
			birthdate: user.birthdate,
			gender: user.gender,
			hobby: user.hobby,
			editingId: user.id,
		})
	}

	render() {
		return (
			<div className='h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6'>
				<div className='w-96 bg-white shadow-2xl rounded-2xl p-8 flex flex-col space-y-6'>
					<h2 className='text-3xl font-extrabold text-gray-900 text-center'>
						{this.state.editingId ? 'Edit Profile' : 'Create Profile'}
					</h2>
					<form
						onSubmit={this.handleSubmit}
						className='flex flex-col space-y-5'
					>
						<input
							type='text'
							value={this.state.fname}
							onChange={e => this.setState({ fname: e.target.value })}
							placeholder='First Name'
							required
							className='p-3 bg-gray-200 rounded-lg focus:ring-4 focus:ring-purple-400 shadow-inner'
						/>
						<input
							type='text'
							value={this.state.lname}
							onChange={e => this.setState({ lname: e.target.value })}
							placeholder='Last Name'
							required
							className='p-3 bg-gray-200 rounded-lg focus:ring-4 focus:ring-purple-400 shadow-inner'
						/>
						<input
							type='date'
							value={this.state.birthdate}
							onChange={e => this.setState({ birthdate: e.target.value })}
							required
							className='p-3 bg-gray-200 rounded-lg focus:ring-4 focus:ring-purple-400 shadow-inner'
						/>
						<select
							value={this.state.gender}
							onChange={e => this.setState({ gender: e.target.value })}
							className='p-3 bg-gray-200 rounded-lg focus:ring-4 focus:ring-purple-400 shadow-inner'
						>
							<option value='male'>Male</option>
							<option value='female'>Female</option>
						</select>
						<input
							type='text'
							value={this.state.hobby}
							onChange={e => this.setState({ hobby: e.target.value })}
							placeholder='Hobby'
							required
							className='p-3 bg-gray-200 rounded-lg focus:ring-4 focus:ring-purple-400 shadow-inner'
						/>
						<button
							type='submit'
							className='bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105'
						>
							{this.state.editingId ? 'Update User' : 'Add User'}
						</button>
					</form>
				</div>

				{/* Users List */}
				<div className='flex-1 p-6'>
					<h2 className='text-4xl font-extrabold text-white mb-6 text-center'>
						User Profiles
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{this.state.users.map(user => (
							<div
								key={user.id}
								className='flex items-center bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-transform transform hover:scale-105'
							>
								<img
									src={user.gender === 'male' ? male : female}
									alt='Avatar'
									className='w-20 h-20 rounded-full border-4 border-purple-500 mr-6'
								/>
								<div className='flex-1'>
									<h3 className='text-xl font-bold text-gray-900'>
										{user.fname} {user.lname}
									</h3>
									<p className='text-gray-700 text-sm mt-1'>{user.birthdate}</p>
									<p className='text-gray-700 text-sm'>{user.hobby}</p>
								</div>
								<button
									onClick={() => this.handleEdit(user)}
									className='bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition-transform transform hover:scale-105 mr-2'
								>
									Edit
								</button>
								<button
									onClick={() => this.handleDelete(user.id)}
									className='bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition-transform transform hover:scale-105'
								>
									Delete
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}
